import { format } from "date-fns"
import { DollarSignIcon, Icon } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { cn, formatCurrency } from "@/lib/utils"
import { Transaction } from "@/models/transaction"
import { transactionColorMapper, transactionIconMapper } from "../../_utils"

interface Props {
  transaction: Transaction
}

export default function TransactionSummaryItem({ transaction }: Props) {


  return (
    <li className="w-full flex justify-between items-center">
      <div className="flex justify-start items-center gap-4">
        <div className={cn("bg-muted p-2 rounded-md", transactionColorMapper(transaction.type))}>
          {transactionIconMapper(transaction.type)}
        </div>
        <div>
          <h3 className="font-semibold">{transaction.description}</h3>
          <p className="text-sm text-muted-foreground">{format(new Date(transaction.date), "dd MMM yyyy", { locale: ptBR })}</p>
        </div>
      </div>
      <p>{formatCurrency(transaction.amount)}</p>
    </li>
  )
}
