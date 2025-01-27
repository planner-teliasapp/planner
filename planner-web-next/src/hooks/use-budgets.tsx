import { createTransactionsAction, deleteTransactionAction, getTransactionsAction } from "@/actions/budgets"
import { createRecurringTransactionsAction } from "@/actions/budgets/create-recurring-transaction"
import { getRecurringTransactionsAction } from "@/actions/budgets/get-recurring-transactions"
import { updateRecurringTransactionsAction } from "@/actions/budgets/update-recurring-transaction"
import { updateTransactionsAction } from "@/actions/budgets/update-transaction"
import { CreateRecurringTransactionDto, CreateTransactionDto, ITransactionSummary, RecurringTransaction, Transaction, UpdateRecurringTransactionDto, UpdateTransactionDto } from "@/models/transaction"
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

  const { mutateAsync: updateTransaction, isPending: isUpdatingTransaction } = useMutation({
    mutationKey: ["updateTransaction"],
    mutationFn: async (data: UpdateTransactionDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      const result = await updateTransactionsAction(data)
      const transaction = Transaction.fromString(result)

      queryClient.setQueryData(["transactions"], (data: { items: Transaction[]; summary: ITransactionSummary }) => {
        return {
          items: Transaction.orderByDate(updateTransactionToTransactions(data.items, transaction)),
          summary: Transaction.getSummary(updateTransactionToTransactions(data.items, transaction))
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

  const { mutateAsync: createRecurringTransaction, isPending: isCreatingRecurringTransaction } = useMutation({
    mutationKey: ["createRecurringTransaction"],
    mutationFn: async (data: CreateRecurringTransactionDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      const result = await createRecurringTransactionsAction(data, user.id)
      const transaction = RecurringTransaction.fromString(result)

      queryClient.setQueryData(["recurringTransactions"], (data: { items: RecurringTransaction[] }) => {
        return {
          items: addCreatedRecurringTransactionToTransactions(data.items, transaction)
        }
      })

      return transaction
    }
  })

  const { mutateAsync: updateRecurringTransaction, isPending: isUpdatingRecurringTransaction } = useMutation({
    mutationKey: ["updateRecurringTransaction"],
    mutationFn: async (data: UpdateRecurringTransactionDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      const result = await updateRecurringTransactionsAction(data)
      const transaction = RecurringTransaction.fromString(result)

      queryClient.setQueryData(["recurringTransactions"], (data: { items: RecurringTransaction[] }) => {
        return {
          items: updateRecurringTransactionToTransactions(data.items, transaction)
        }
      })

      return transaction
    }
  })

  return {
    transactions,
    isLoadingTransactions,
    createTransaction,
    isCreatingTransaction,
    updateTransaction,
    isUpdatingTransaction,
    deleteTransaction,
    isDeletingTransaction,
    recurringTransactions,
    isLoadingRecurringTransactions,
    createRecurringTransaction,
    isCreatingRecurringTransaction,
    updateRecurringTransaction,
    isUpdatingRecurringTransaction
  }
}

function addCreatedTransactionToTransactions(transactions: Transaction[], transaction: Transaction): Transaction[] {
  return [...transactions, transaction]
}

function updateTransactionToTransactions(transactions: Transaction[], transaction: Transaction): Transaction[] {
  return transactions.map(t => t.id === transaction.id ? transaction : t)
}

function addCreatedRecurringTransactionToTransactions(transactions: RecurringTransaction[], transaction: RecurringTransaction): RecurringTransaction[] {
  return [...transactions, transaction]
}

function updateRecurringTransactionToTransactions(transactions: RecurringTransaction[], transaction: RecurringTransaction): RecurringTransaction[] {
  return transactions.map(t => t.id === transaction.id ? transaction : t)
}

function removeDeletedTransactionFromTransactions(transactions: Transaction[], transactionId: string): Transaction[] {
  return transactions.filter(transaction => transaction.id !== transactionId)
}