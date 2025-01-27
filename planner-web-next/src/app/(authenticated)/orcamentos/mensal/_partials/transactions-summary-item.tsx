import { format } from "date-fns"
import { DollarSignIcon, Icon } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { cn, formatCurrency } from "@/lib/utils"
import { Transaction } from "@/models/transaction"
import { transactionColorMapper, transactionIconMapper } from "../../_utils"
import { SheetTrigger } from "@/components/ui/sheet"
import { ComponentProps } from "react"

interface Props extends ComponentProps<"li"> {
  transaction: Transaction
}

export default function TransactionSummaryItem({ transaction, ...rest }: Props) {

  return (
    <li
      className="w-full flex justify-between items-center"
      {...rest}
    >
      <SheetTrigger className="contents">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className={cn("bg-muted p-2 rounded-md", transactionColorMapper(transaction.type))}>
              {transactionIconMapper(transaction.type)}
            </div>
            <div className="flex flex-col justify-start items-start">
              <h3 className="font-semibold">{transaction.description}</h3>
              <p className="text-sm text-muted-foreground">{format(new Date(transaction.date), "dd MMM yyyy", { locale: ptBR })}</p>
            </div>
          </div>
          <p>{formatCurrency(transaction.amount)}</p>
        </div>
      </SheetTrigger>
    </li>
  )
}
