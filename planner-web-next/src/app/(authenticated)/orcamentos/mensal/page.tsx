"use client"

import { H1 } from "@/components/ui/typography"
import { convertHumanIntToMonth, validatedMonth, validatedYear } from "@/lib/utils"
import SummaryCard from "./_partials/summary-card"
import { ChevronLeftIcon, CreditCardIcon, DollarSignIcon, PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react"
import SummaryChart from "./_partials/summary-chart"
import TransactionSummary from "./_partials/transactions-summary"
import { useBudget } from "@/hooks/use-budget"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import CreateTransactionButton from "../_partials/create-transaction-button"
import { CreateTransactionDto } from "@/models/transaction"
import { useToast } from "@/hooks/use-toast"

interface Props {
  searchParams: {
    ano?: string
    mes?: string
  }
}

export default function OrcamentoMensalPage({ searchParams }: Props) {
  const year = validatedYear(searchParams.ano) || new Date().getFullYear()
  const month = validatedMonth(searchParams.mes) || new Date().getMonth() + 1
  const { transactions, isLoadingTransactions, createTransaction, isCreatingTransaction } = useBudget({ year, month })
  const router = useRouter()
  const { toast } = useToast()

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
      <div className="w-full flex justify-start items-center sm:gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
        <H1>Orçamento {convertHumanIntToMonth(month)} de {year}</H1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 pt-6'>
        <SummaryCard title="Saldo" amount={transactions?.summary.balance} className="sm:col-span-4" Icon={DollarSignIcon} amountTextClassName="sm:text-4xl" isLoading={isLoadingTransactions} />
        <div className="col-span-4 w-full hidden sm:block border rounded-lg">
        </div>
        <SummaryCard title="Receitas" amount={transactions?.summary.income} className="sm:col-span-2" Icon={TrendingUpIcon} iconClassName="text-chart-2" isLoading={isLoadingTransactions} />
        <SummaryCard title="Despesas" amount={transactions?.summary.expense} className="sm:col-span-2" Icon={TrendingDownIcon} useSecondaryBackground isLoading={isLoadingTransactions} iconClassName="text-destructive" />
        <SummaryCard title="Investido" amount={transactions?.summary.invested} className="sm:col-span-2" Icon={PiggyBankIcon} iconClassName="text-chart-6" useSecondaryBackground isLoading={isLoadingTransactions} />
        <SummaryCard title="Caixinhas" amount={transactions?.summary.wallet} className="sm:col-span-2" Icon={WalletIcon} iconClassName="text-chart-4" useSecondaryBackground isLoading={isLoadingTransactions} />
        <SummaryChart year={year} month={month} summary={transactions?.summary} className="sm:col-span-5" isLoading={isLoadingTransactions} />
        <div className="col-span-3">
          <SummaryCard title="Cartão de Crédito" amount={transactions?.summary.creditCard} Icon={CreditCardIcon} isLoading={isLoadingTransactions} iconClassName="text-destructive" />
        </div>

        <div className="sm:col-start-9 sm:col-span-4 sm:row-start-1 sm:row-span-3 w-full flex flex-col gap-2">
          <CreateTransactionButton onSubmit={onSubmit} isLoading={isCreatingTransaction} className="sm:w-full" />
          <TransactionSummary
            transactions={transactions?.items}
            searchParams={`?ano=${year}&mes=${month}`}
            isLoading={isLoadingTransactions}
            className="w-full" />
        </div>
      </div>
    </div>
  )
}
