import { format } from "date-fns"
import { DollarSignIcon } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { formatCurrency } from "@/lib/utils"
import { Transaction } from "@/models/transaction"

interface Props {
  transaction: Transaction
}

export default function TransactionSummaryItem({ transaction }: Props) {

  return (
    <li className="w-full flex justify-between items-center">
      <div className="flex justify-start items-center gap-4">
        <div className="bg-muted p-2 rounded-md">
          <DollarSignIcon size={24} />
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
