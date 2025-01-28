"use client"

import { DataTable } from "@/components/ui/data-table"
import { RecurringTransaction } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import { cn, convertIntToMonth, convertIntToWeekday, formatCurrency } from "@/lib/utils"
import { PaymentMethod, TransactionFrequency, TransactionType } from "@prisma/client"
import EditRecurringTransactionButton from "./edit-recurring-transaction-button"
import { paymentFrequencyMapper, paymentMethodMapper, transactionMapper } from "../_utils"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"


export const columns: ColumnDef<RecurringTransaction>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "referenceValue",
    header: () => <p className="text-center">Valor</p>,
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "type",
    header: () => <p className="text-center">Tipo</p>,
    cell: (row) => (
      <div className="flex justify-start items-center gap-2">
        <div className={cn("size-2 rounded-full", transactionMapper[row.getValue() as TransactionType].bgColor)}></div>
        <p>{transactionMapper[row.getValue() as TransactionType].label}</p>
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: (row) => paymentMethodMapper[row.getValue() as PaymentMethod].label,
  },
  {
    accessorKey: "frequency",
    header: () => <p className="text-center">Recorrência</p>,
    cell: (row) => <p className="text-center">{paymentFrequencyMapper[row.getValue() as TransactionFrequency].label}</p>,
  },
  {
    accessorKey: "startDate",
    header: () => <p className="text-center">Inicia em</p>,
    cell: (row) => <p className="text-center">{new Date(row.getValue() as string).toLocaleDateString()}</p>,
  },
  {
    accessorKey: "endDate",
    header: () => <p className="text-center">Finaliza em</p>,
    cell: (row) => <p className="text-center">{(row.getValue() ? new Date(row.getValue() as string).toLocaleDateString() : "-")}</p>,
  },
  {
    accessorKey: "expectedDayOfWeek",
    header: () => <p className="text-center">Dia da semana</p>,
    cell: (row) => <p className="text-center">{row.getValue() ? convertIntToWeekday(row.getValue() as number) : "-"}</p>,
  },
  {
    accessorKey: "expectedDayOfMonth",
    header: () => <p className="text-center">Dia do mês</p>,
    cell: (row) => <p className="text-center">{row.getValue() ? row.getValue() as number : "-"}</p>,
  },
  {
    accessorKey: "expectedMonthOfYear",
    header: () => <p className="text-center">Mês do ano</p>,
    cell: (row) => <p className="text-center">{typeof row.getValue() === "number" ? convertIntToMonth(row.getValue() as number) : "-"}</p>,
  },
  {
    accessorKey: "id",
    header: () => <p className="text-center">Ações</p>,
    cell: (row) => (
      <div className="flex justify-center items-center gap-1">
        <Link
          href={`/orcamentos/recorrentes/${row.getValue() as string}`}
          className={buttonVariants({
            size: "icon"
          })}
        >
          <ExternalLinkIcon />
        </Link>
        <EditRecurringTransactionButton
          transactionId={row.getValue() as string}
        />
      </div>
    ),
  },
]

interface Props {
  transactions?: RecurringTransaction[]
  isLoading?: boolean
}

export default function RecurringTransactionsTable({ transactions = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={transactions} isLoading={isLoading} />
  )
}
