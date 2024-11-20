import { createTransactionsAction, deleteTransactionAction, getTransactionsAction } from "@/actions/budgets"
import { CreateTransactionDto, ITransactionSummary, Transaction } from "@/models/transaction"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Props {
  month: number
  year: number
}

export const useBudget = ({ month, year }: Props) => {
  const queryClient = useQueryClient()
  const { user } = useKindeBrowserClient()

  const { data: transactions, isPending: isLoadingTransactions } = useQuery({
    queryKey: ["transactions", user?.id, year, month],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getTransactionsAction(user.id, year, month)
      const items = Transaction.fromStringArray(data)

      return {
        items: Transaction.orderByDate(items),
        summary: Transaction.getSummary(items)
      }
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: createTransaction, isPending: isCreatingTransaction } = useMutation({
    mutationKey: ["createTransaction"],
    mutationFn: async (data: CreateTransactionDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      const result = await createTransactionsAction(data, user.id)
      const transaction = Transaction.fromString(result)

      if (data.date.getMonth() == month - 1 || data.date.getFullYear() == year) {
        queryClient.setQueryData(["transactions", user?.id, year, month], (data: { items: Transaction[]; summary: ITransactionSummary }) => {
          return {
            items: Transaction.orderByDate(addCreatedTransactionToTransactions(data.items, transaction)),
            summary: Transaction.getSummary(addCreatedTransactionToTransactions(data.items, transaction))
          }
        })
      }

      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    }
  })

  const { mutateAsync: deleteTransaction, isPending: isDeletingTransaction } = useMutation({
    mutationKey: ["deleteTransaction"],
    mutationFn: async (transactionId: string) => {

      await deleteTransactionAction(transactionId)

      queryClient.setQueryData(["transactions", user?.id, year, month], (data: { items: Transaction[]; summary: ITransactionSummary }) => {
        return {
          items: Transaction.orderByDate(removeDeletedTransactionFromTransactions(data.items, transactionId)),
          summary: Transaction.getSummary(removeDeletedTransactionFromTransactions(data.items, transactionId))
        }
      })

      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    }
  })

  return {
    transactions,
    isLoadingTransactions,
    createTransaction,
    isCreatingTransaction,
    deleteTransaction,
    isDeletingTransaction
  }
}

function addCreatedTransactionToTransactions(transactions: Transaction[], transaction: Transaction): Transaction[] {
  return [...transactions, transaction]
}

function removeDeletedTransactionFromTransactions(transactions: Transaction[], transactionId: string): Transaction[] {
  return transactions.filter(transaction => transaction.id !== transactionId)
}