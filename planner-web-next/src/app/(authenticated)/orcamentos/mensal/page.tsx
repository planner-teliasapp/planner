"use client"

import { H1 } from "@/components/ui/typography"
import { convertIntToMonth, validatedMonth, validatedYear } from "@/lib/utils"
import SummaryCard from "./_partials/summary-card"
import { DollarSignIcon, PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react"
import SummaryChart from "./_partials/summary-chart"
import TransactionSummary from "./_partials/transactions-summary"

interface Props {
  searchParams: {
    year?: string
    month?: string
  }
}

export default function OrcamentoMensalPage({ searchParams }: Props) {

  const year = validatedYear(searchParams.year) || new Date().getFullYear()
  const month = validatedMonth(searchParams.month) || new Date().getMonth() + 1

  const data = {
    saldo: 3519.56,
    receitas: 20000,
    despesas: 5678.33,
    investido: 9567.55,
    caixinhas: 1234.56,
  }

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <H1>Orçamento {convertIntToMonth(month)} de {year}</H1>
      <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 pt-6'>
        <SummaryCard title="Saldo" amount={data.saldo} className="sm:col-span-4" Icon={DollarSignIcon} amountTextClassName="sm:text-4xl" />
        <div className="hidden sm:block col-span-4 bg-primary"></div>
        <SummaryCard title="Receitas" amount={data.receitas} className="sm:col-span-2" Icon={TrendingUpIcon} />
        <SummaryCard title="Despesas" amount={data.despesas} className="sm:col-span-2" Icon={TrendingDownIcon} useSecondaryBackground />
        <SummaryCard title="Investido" amount={data.investido} className="sm:col-span-2" Icon={PiggyBankIcon} useSecondaryBackground />
        <SummaryCard title="Caixinhas" amount={data.caixinhas} className="sm:col-span-2" Icon={WalletIcon} useSecondaryBackground />
        <SummaryChart className="sm:col-span-5" />
        <div className="hidden sm:block col-span-3 bg-primary"></div>

        {/* <TransactionSummary className="sm:col-span-4 sm:row-span-3" /> */}
        <TransactionSummary className="sm:col-start-9 sm:col-span-4 sm:row-start-1 sm:row-span-3" />


      </div>
    </div>
  )
}
