import { TransactionType } from "@prisma/client"
import { DollarSignIcon, LucideIcon, PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react"

export function transactionColorMapper(type: TransactionType | string) {
  switch (type) {
    case TransactionType.INCOME:
      return "text-chart-2"
    case TransactionType.EXPENSE:
      return "text-destructive"
    case TransactionType.INVESTMENT:
      return "text-chart-6"
    case TransactionType.PENSION:
      return "text-chart-6"
    case TransactionType.WALLET:
      return "text-chart-4"
    default:
      return "text-muted-foreground"
  }
}

export function transactionIconMapper(type: TransactionType | string) {
  switch (type) {
    case TransactionType.INCOME:
      return <TrendingUpIcon />
    case TransactionType.EXPENSE:
      return <TrendingDownIcon />
    case TransactionType.INVESTMENT:
      return <PiggyBankIcon />
    case TransactionType.PENSION:
      return <PiggyBankIcon />
    case TransactionType.WALLET:
      return <WalletIcon />
    default:
      return <DollarSignIcon />
  }
}