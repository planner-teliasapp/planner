import { PaymentMethod, TransactionType } from "@prisma/client"
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

type TransactionMapper = {
  icon: JSX.Element
  color: string
  bgColor: string
  label: string
  labelPlural: string
}

export const transactionMapper: Record<TransactionType, TransactionMapper> = {
  [TransactionType.INCOME]: {
    icon: <TrendingUpIcon />,
    color: "text-chart-2",
    bgColor: "bg-chart-2",
    label: "Receita",
    labelPlural: "Receitas",
  },
  [TransactionType.EXPENSE]: {
    icon: <TrendingDownIcon />,
    color: "text-destructive",
    bgColor: "bg-destructive",
    label: "Despesa",
    labelPlural: "Despesas",
  },
  [TransactionType.INVESTMENT]: {
    icon: <PiggyBankIcon />,
    color: "text-chart-6",
    bgColor: "bg-chart-6",
    label: "Investimento",
    labelPlural: "Investimentos",
  },
  [TransactionType.PENSION]: {
    icon: <PiggyBankIcon />,
    color: "text-chart-6",
    bgColor: "bg-chart-6",
    label: "Previdência",
    labelPlural: "Previdências",
  },
  [TransactionType.WALLET]: {
    icon: <WalletIcon />,
    color: "text-chart-4",
    bgColor: "bg-chart-4",
    label: "Caixinha",
    labelPlural: "Caixinhas",
  }
}

type PaymentMethodMapper = {
  label: string
}

export const PaymentMethodMapper: Record<PaymentMethod, PaymentMethodMapper> = {
  [PaymentMethod.CREDIT]: {
    label: "Cartão de crédito"
  },
  [PaymentMethod.DEBIT]: {
    label: "Cartão de débito"
  },
  [PaymentMethod.PIX]: {
    label: "PIX"
  },
  [PaymentMethod.TRANSFER]: {
    label: "Transferência"
  }
}