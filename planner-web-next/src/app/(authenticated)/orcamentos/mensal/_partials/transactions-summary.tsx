import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"


import { ClassNameValue } from "tailwind-merge"
import TransactionSummaryItem from "./transactions-summary-item"

interface Props {
  className?: ClassNameValue
}

export default function TransactionSummary({ className }: Props) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Transações</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="w-full flex flex-col gap-2 sm:gap-4">
          <TransactionSummaryItem />
          <TransactionSummaryItem />
          <TransactionSummaryItem />
          <TransactionSummaryItem />
          <TransactionSummaryItem />
          <TransactionSummaryItem />
          <TransactionSummaryItem />
        </ul>
      </CardContent>
    </Card>
  )
}
