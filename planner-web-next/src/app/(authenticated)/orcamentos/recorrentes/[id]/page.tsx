"use client"

import { Button } from "@/components/ui/button"
import { Caption, H1, H2 } from "@/components/ui/typography"
import { ChevronLeftIcon, DollarSignIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import TransactionsTable from "./_partials/transactions-table"
import { useBudgets } from "@/hooks/use-budgets"
import { useMemo } from "react"
import SummaryCard from "../../mensal/_partials/summary-card"
import { cn } from "@/lib/utils"
import { paymentFrequencyMapper, transactionMapper } from "../../_utils"
import { TransactionFrequency, TransactionType } from "@prisma/client"
import { format } from "date-fns"
import CountUp from "react-countup"
import { TransactionHistoryChart } from "./_partials/transaction-history-chart"
import { ptBR } from "date-fns/locale"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
  params: {
    id?: string
  }
}

export default function Page({ params }: Props) {
  const router = useRouter()
  const { transactions, isLoadingTransactions, recurringTransactions, isLoadingRecurringTransactions } = useBudgets()

  const recurringTransaction = useMemo(() => {
    return recurringTransactions?.items.find((transaction) => transaction.id === params.id)
  }, [recurringTransactions, params.id])

  const transactionsFromId = useMemo(() => {
    return transactions?.items.filter((transaction) => transaction.recurringTransactionId === params.id)
  }, [transactions, params.id])

  const transactionSummary = useMemo(() => {
    const total = transactionsFromId?.reduce((acc, transaction) => acc + transaction.amount, 0)
    const first = transactionsFromId?.[transactionsFromId.length - 1]
    const last = transactionsFromId?.[0]
    const greatestAmountTransaction = transactionsFromId?.reduce((acc, transaction) => acc.amount > transaction.amount ? acc : transaction)
    const smallestAmountTransaction = transactionsFromId?.reduce((acc, transaction) => acc.amount < transaction.amount ? acc : transaction)
    const count = transactionsFromId?.length

    const chartData = transactionsFromId?.map((transaction) => ({
      month: format(new Date(transaction.date), "dd'/'MMM'/'yy", { locale: ptBR }),
      amount: transaction.amount
    })) || []

    return {
      total,
      first,
      last,
      greatestAmountTransaction,
      smallestAmountTransaction,
      count,
      chartData: chartData.reverse()
    }
  }, [transactionsFromId])

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">{recurringTransaction?.description}</H1>
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-6 xl:grid-cols-12 gap-4 pt-6'>
        <SummaryCard title="Total" amount={transactionSummary.total} className="col-span-2 sm:col-span-3 max-h-40" Icon={DollarSignIcon} amountTextClassName="sm:text-3xl xl:text-4xl" isLoading={isLoadingTransactions || isLoadingRecurringTransactions} />
        <div className="col-span-2 sm:col-span-3 row-start-1 sm:row-start-auto border rounded-lg max-h-40">
          <div className="h-full flex flex-col justify-between items-start p-6">
            <H2>{transactionMapper[recurringTransaction?.type as TransactionType]?.label}</H2>
            <Caption className="text-muted-foreground">{paymentFrequencyMapper[recurringTransaction?.frequency as TransactionFrequency]?.label}</Caption>
            {transactionSummary.first?.date && <p className="self-center">{new Date(transactionSummary.first?.date).toLocaleDateString()} - {new Date(transactionSummary.last?.date || "").toLocaleDateString()}</p>}
          </div>
        </div>
        <div className="col-span-2 border rounded-lg min-h-24 px-6 py-4 flex flex-col justify-between items-start gap-1 max-h-32">
          <p className="text-muted-foreground text-sm">Maior Valor</p>
          <p className='mt-2 text-base text-muted-foreground self-center'>
            R$ <CountUp start={0} end={transactionSummary.greatestAmountTransaction?.amount || 0} duration={1} decimals={2} separator=" " decimal="," className={cn("text-foreground font-medium text-3xl xl:text-2xl")} /></p>
          {transactionSummary.greatestAmountTransaction?.date && <p className="text-xs text-muted-foreground">em {new Date(transactionSummary.greatestAmountTransaction?.date).toLocaleDateString()}</p>}
        </div>
        <div className="col-span-2 border rounded-lg min-h-24 px-6 py-4 flex flex-col justify-between items-start gap-1 max-h-32">
          <p className="text-muted-foreground text-sm">Menor Valor</p>
          <p className='mt-2 text-base text-muted-foreground self-center'>
            R$ <CountUp start={0} end={transactionSummary.smallestAmountTransaction?.amount || 0} duration={1} decimals={2} separator=" " decimal="," className={cn("text-foreground font-medium text-3xl xl:text-2xl")} /></p>
          {transactionSummary.smallestAmountTransaction?.date && <p className="text-xs text-muted-foreground">em {new Date(transactionSummary.smallestAmountTransaction?.date).toLocaleDateString()}</p>}
        </div>
        <div className="col-span-2 border rounded-lg min-h-24 px-6 py-4 flex flex-col justify-between items-start gap-1 max-h-32">
          <p className="text-muted-foreground text-sm">Recorrências</p>
          <p className='mt-2 text-base text-muted-foreground self-center'>
            <CountUp start={0} end={transactionSummary.count || 0} duration={1} decimals={0} separator=" " decimal="," className={cn("text-foreground font-medium text-3xl xl:text-2xl")} /></p>
          {transactionSummary.first?.date && <p className="text-xs text-muted-foreground">{format(new Date(transactionSummary.first?.date), "dd/MM/yy")} - {format(new Date(transactionSummary.last?.date || ""), "dd/MM/yy")}</p>}
        </div>
        <div className="col-span-2 sm:col-span-6 row-span-1 border rounded-lg">
          <TransactionHistoryChart
            isLoading={isLoadingTransactions || isLoadingRecurringTransactions}
            chartData={transactionSummary.chartData} />
        </div>
        <section className='h-full col-span-2 sm:col-span-6 xl:row-span-3 xl:row-start-1 xl:col-start-7'>
          <ScrollArea className="xl:h-[740px]">
            <TransactionsTable
              transactions={transactionsFromId}
              isLoading={isLoadingTransactions}
            />
          </ScrollArea>
        </section>
      </div>
    </div>
  )
}
