import { format } from "date-fns"
import { DollarSignIcon } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { formatCurrency } from "@/lib/utils"

export default function TransactionSummaryItem() {

  const data = {
    amount: 3900,
    description: "Aluguel",
    date: new Date()
  }

  return (
    <li className="w-full flex justify-between items-center">
      <div className="flex justify-start items-center gap-4">
        <div className="bg-muted p-2 rounded-md">
          <DollarSignIcon size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{data.description}</h3>
          <p className="text-sm text-muted-foreground">{format(data.date, "dd MMM yyyy", { locale: ptBR })}</p>
        </div>
      </div>
      <p>{formatCurrency(data.amount)}</p>
    </li>
  )
}
