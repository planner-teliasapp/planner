import { format } from "date-fns"
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
        <div className="w-full flex justify-start items-center gap-2">
          <div className={cn("bg-muted p-2 rounded-md", transactionColorMapper(transaction.type))}>
            {transactionIconMapper(transaction.type)}
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-[2px]">
            <h3 className="font-semibold line-clamp-1 text-start">{transaction.description}</h3>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{format(new Date(transaction.date), "dd MMM yyyy", { locale: ptBR })}</p>
              <p className="text-sm text-end">{formatCurrency(999999.99)}</p>
            </div>
          </div>
        </div>
      </SheetTrigger>
    </li>
  )
}
