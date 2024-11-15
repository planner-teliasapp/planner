import { getTransactionsAction } from "@/actions/budgets/get-transactions"
import { Transaction } from "@/models/transaction"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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
        items,
        summary: Transaction.getSummary(items)
      }
    },
    staleTime: 60_000 * 10
  })

  return {
    transactions,
    isLoadingTransactions
  }
}