"use client"

import { H1 } from "@/components/ui/typography"
import { convertIntToMonth, validatedMonth, validatedYear } from "@/lib/utils"
import SummaryCard from "./_partials/summary-card"
import { DollarSignIcon, PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react"
import SummaryChart from "./_partials/summary-chart"
import TransactionSummary from "./_partials/transactions-summary"
import { useBudget } from "@/hooks/use-budget"

interface Props {
  searchParams: {
    ano?: string
    mes?: string
  }
}

export default function OrcamentoMensalPage({ searchParams }: Props) {
  const year = validatedYear(searchParams.ano) || new Date().getFullYear()
  const month = validatedMonth(searchParams.mes) || new Date().getMonth() + 1
  const { transactions, isLoadingTransactions } = useBudget({ year, month })

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <H1>Orçamento {convertIntToMonth(month)} de {year}</H1>
      <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 pt-6'>
        <SummaryCard title="Saldo" amount={transactions?.summary.balance} className="sm:col-span-4" Icon={DollarSignIcon} amountTextClassName="sm:text-4xl" isLoading={isLoadingTransactions} />
        <div className="hidden sm:block col-span-4 bg-primary"></div>
        <SummaryCard title="Receitas" amount={transactions?.summary.income} className="sm:col-span-2" Icon={TrendingUpIcon} isLoading={isLoadingTransactions} />
        <SummaryCard title="Despesas" amount={transactions?.summary.expense} className="sm:col-span-2" Icon={TrendingDownIcon} useSecondaryBackground isLoading={isLoadingTransactions} />
        <SummaryCard title="Investido" amount={transactions?.summary.invested} className="sm:col-span-2" Icon={PiggyBankIcon} useSecondaryBackground isLoading={isLoadingTransactions} />
        <SummaryCard title="Caixinhas" amount={transactions?.summary.wallet} className="sm:col-span-2" Icon={WalletIcon} useSecondaryBackground isLoading={isLoadingTransactions} />
        <SummaryChart year={year} month={month} summary={transactions?.summary} className="sm:col-span-5" isLoading={isLoadingTransactions} />
        <div className="hidden sm:block col-span-3 bg-primary"></div>

        <TransactionSummary
          transactions={transactions?.items}
          isLoading={isLoadingTransactions}
          className="sm:col-start-9 sm:col-span-4 sm:row-start-1 sm:row-span-3" />
      </div>
    </div>
  )
}
