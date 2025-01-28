"use client"

import { H1 } from "@/components/ui/typography"
import { CreateRecurringTransactionDto } from "@/models/transaction"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import CreateRecurringTransactionButton from "../_partials/create-recurring-transaction-button"
import { useBudgets } from "@/hooks/use-budgets"
import RecurringTransactionsTable from "./recurring-transaction-table"

export default function RecurringTransactionSection() {
  const { recurringTransactions, isLoadingRecurringTransactions, createRecurringTransaction, isCreatingRecurringTransaction } = useBudgets()
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(data: CreateRecurringTransactionDto) {
    try {
      await createRecurringTransaction(data)
      toast({
        title: "Transação registrada",
        description: "A transação foi registrada com sucesso",
      })
    } catch (error) {
      const { message } = error as Error
      console.error(error)
      toast({
        title: "Erro ao registrar transação",
        description: message,
      })

      throw error
    }
  }

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <H1 className="text-start w-full">Transações Cadastradas</H1>
        </div>
        <CreateRecurringTransactionButton onSubmit={onSubmit} isLoading={isCreatingRecurringTransaction} />
      </div>
      <div className='pt-6'>
        <RecurringTransactionsTable transactions={recurringTransactions?.items} isLoading={isLoadingRecurringTransactions} />
      </div>
    </div>
  )
}
