import { createTransactionsAction, deleteTransactionAction, getTransactionsAction } from "@/actions/budgets"
import { getRecurringTransactionsAction } from "@/actions/budgets/get-recurring-transactions"
import { CreateTransactionDto, ITransactionSummary, RecurringTransaction, Transaction } from "@/models/transaction"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useBudgets = () => {
  const queryClient = useQueryClient()
  const { user } = useKindeBrowserClient()

  const { data: transactions, isPending: isLoadingTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getTransactionsAction(user.id)
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

      queryClient.setQueryData(["transactions"], (data: { items: Transaction[]; summary: ITransactionSummary }) => {
        return {
          items: Transaction.orderByDate(addCreatedTransactionToTransactions(data.items, transaction)),
          summary: Transaction.getSummary(addCreatedTransactionToTransactions(data.items, transaction))
        }
      })
    }
  })

  const { mutateAsync: deleteTransaction, isPending: isDeletingTransaction } = useMutation({
    mutationKey: ["deleteTransaction"],
    mutationFn: async (transactionId: string) => {

      await deleteTransactionAction(transactionId)

      queryClient.setQueryData(["transactions"], (data: { items: Transaction[]; summary: ITransactionSummary }) => {
        return {
          items: Transaction.orderByDate(removeDeletedTransactionFromTransactions(data.items, transactionId)),
          summary: Transaction.getSummary(removeDeletedTransactionFromTransactions(data.items, transactionId))
        }
      })

    }
  })

  const { data: recurringTransactions, isPending: isLoadingRecurringTransactions } = useQuery({
    queryKey: ["recurringTransactions"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getRecurringTransactionsAction(user.id)
      const items = RecurringTransaction.fromStringArray(data)

      return {
        items
      }
    },
    staleTime: 60_000 * 10
  })

  return {
    transactions,
    isLoadingTransactions,
    createTransaction,
    isCreatingTransaction,
    deleteTransaction,
    isDeletingTransaction,
    recurringTransactions,
    isLoadingRecurringTransactions
  }
}

function addCreatedTransactionToTransactions(transactions: Transaction[], transaction: Transaction): Transaction[] {
  return [...transactions, transaction]
}

function removeDeletedTransactionFromTransactions(transactions: Transaction[], transactionId: string): Transaction[] {
  return transactions.filter(transaction => transaction.id !== transactionId)
}