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

interface Props {
  transactions?: Transaction[]
  className?: ClassNameValue
}

export default function TransactionSummary({ transactions = [], className }: Props) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Transações</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[560px]">
          <ul className="w-full flex flex-col gap-2 sm:gap-4 pr-4">
            {transactions.map((transaction) => (
              <TransactionSummaryItem key={transaction.id} transaction={transaction} />
            ))}

          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
