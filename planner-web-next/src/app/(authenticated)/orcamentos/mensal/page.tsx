"use client"

import { H1 } from "@/components/ui/typography"
import { convertHumanIntToMonth, validatedMonth, validatedYear } from "@/lib/utils"
import SummaryCard from "./_partials/summary-card"
import { ChevronLeftIcon, CreditCardIcon, DollarSignIcon, LucideIcon, PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react"
import SummaryChart from "./_partials/summary-chart"
import TransactionSummary from "./_partials/transactions-summary"
import { useBudget } from "@/hooks/use-budget"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import CreateTransactionButton from "../_partials/create-transaction-button"
import { CreateTransactionDto } from "@/models/transaction"
import { useToast } from "@/hooks/use-toast"
import { transactionMapper } from "../_utils"
import { TransactionType } from "@prisma/client"
import { ClassNameValue } from "tailwind-merge"

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

  type CardProps = {
    title: string
    amount?: number | undefined | null
    Icon?: LucideIcon
    iconClassName?: ClassNameValue
    useSecondaryBackground?: boolean
  }

  function SecondaryCard(props: CardProps) {
    return (
      <SummaryCard
        title={props.title}
        amount={props.amount}
        className="col-span-1 sm:col-span-2"
        Icon={props.Icon}
        iconClassName={props.iconClassName}
        isLoading={isLoadingTransactions}
        amountTextClassName="text-xl"
        useSecondaryBackground={props.useSecondaryBackground}
      />
    )
  }

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex justify-start items-center sm:gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
        <H1 className="text-center sm:text-start">Orçamento {convertHumanIntToMonth(month)} de {year}</H1>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-12 gap-2 sm:gap-4 pt-6'>
        <SummaryCard title="Saldo" amount={transactions?.summary.balance} className="col-span-2 sm:col-span-4" Icon={DollarSignIcon} amountTextClassName="sm:text-4xl" isLoading={isLoadingTransactions} />
        <div className="col-span-2 sm:col-span-4 w-full hidden sm:block border rounded-lg">
        </div>
        <SecondaryCard
          title="Receitas"
          amount={transactions?.summary.income}
          Icon={TrendingUpIcon}
          iconClassName="text-chart-2"
        />
        <SecondaryCard
          title="Despesas"
          amount={transactions?.summary.expense}
          Icon={TrendingDownIcon}
          iconClassName="text-destructive"
          useSecondaryBackground
        />
        <SecondaryCard
          title="Investido"
          amount={transactions?.summary.invested}
          Icon={PiggyBankIcon}
          iconClassName="text-chart-6"
          useSecondaryBackground
        />
        <SecondaryCard
          title="Caixinhas"
          amount={transactions?.summary.wallet}
          Icon={WalletIcon}
          iconClassName="text-chart-4"
          useSecondaryBackground
        />
        <SummaryChart year={year} month={month} summary={transactions?.summary} className="col-span-2 sm:col-span-5" isLoading={isLoadingTransactions} />
        <div className="col-span-2 sm:col-span-3 space-y-4">
          <SummaryCard title="Cartão de Crédito" amount={transactions?.summary.creditCard} Icon={CreditCardIcon} isLoading={isLoadingTransactions} iconClassName="text-destructive" />
          <SummaryCard title={transactionMapper[TransactionType.REDEMPTION].labelPlural} amount={transactions?.summary.redemption} Icon={DollarSignIcon} isLoading={isLoadingTransactions} iconClassName={transactionMapper[TransactionType.REDEMPTION].color} />
        </div>

        <div className="sm:col-start-9 col-span-2 sm:col-span-4 sm:row-start-1 sm:row-span-3 w-full flex flex-col gap-2">
          <CreateTransactionButton onSubmit={onSubmit} isLoading={isCreatingTransaction} className="sm:w-full" />
          <TransactionSummary
            year={year}
            month={month}
            transactions={transactions?.items}
            searchParams={`?ano=${year}&mes=${month}`}
            isLoading={isLoadingTransactions}
            className="w-full" />
        </div>
      </div>
    </div>
  )
}
