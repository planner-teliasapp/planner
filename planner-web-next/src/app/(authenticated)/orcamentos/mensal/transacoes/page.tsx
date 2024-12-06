"use client"

import { H1 } from "@/components/ui/typography"
import { convertHumanIntToMonth, validatedMonth, validatedYear } from "@/lib/utils"
import TransactionsTable from "./_partials/transactions-table"
import CreateTransactionButton from "../../_partials/create-transaction-button"
import { useBudget } from "@/hooks/use-budget"
import { CreateTransactionDto } from "@/models/transaction"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"

interface Props {
  searchParams: {
    ano?: string
    mes?: string
  }
}

export default function OrcamentoMensalTransacoesPage({ searchParams }: Props) {
  const year = validatedYear(searchParams.ano) || new Date().getFullYear()
  const month = validatedMonth(searchParams.mes) || new Date().getMonth() + 1

  const { transactions, isLoadingTransactions, createTransaction, isCreatingTransaction } = useBudget({ year, month })
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(data: CreateTransactionDto) {
    try {
      await createTransaction(data)
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
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Transações de {convertHumanIntToMonth(month)} de {year}</H1>
        </div>
        <CreateTransactionButton onSubmit={onSubmit} isLoading={isCreatingTransaction} />
      </div>
      <div className='pt-6'>
        <TransactionsTable transactions={transactions?.items} isLoading={isLoadingTransactions} />
      </div>
    </div>
  )
}
