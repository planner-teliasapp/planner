import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"


import { ClassNameValue } from "tailwind-merge"
import TransactionSummaryItem from "./transactions-summary-item"
import { Transaction } from "@/models/transaction"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import TransactionSummaryItemSkeleton from "./transactions-summary-item-skeleton"

interface Props {
  transactions?: Transaction[]
  isLoading?: boolean
  className?: ClassNameValue
}

export default function TransactionSummary({ transactions = [], className, isLoading }: Props) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <CardTitle>Transações</CardTitle>
        <Link href="/orcamentos/mensal/transacoes">
          <ExternalLinkIcon />
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <ul className="w-full flex flex-col gap-2 sm:gap-4 pr-4">
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
          </ul>
        ) : (
          <ScrollArea className="h-[560px]">
            {transactions.length == 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-muted-foreground">Nenhuma transação registrada.</p>
              </div>
            ) : (
              <ul className="w-full flex flex-col gap-2 sm:gap-4 pr-4">
                {transactions.map((transaction) => (
                  <TransactionSummaryItem key={transaction.id} transaction={transaction} />
                ))}
              </ul>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
