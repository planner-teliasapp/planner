"use client"

import { RecurringTransaction } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import { cn, convertIntToMonth, convertIntToWeekday, formatCurrency } from "@/lib/utils"
import { PaymentMethod, TransactionFrequency, TransactionType } from "@prisma/client"
import { paymentFrequencyMapper, paymentMethodMapper, transactionMapper } from "../../_utils"

export const columns: ColumnDef<RecurringTransaction>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "referenceValue",
    header: "Valor",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "type",
    header: "Tipo",
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
    header: "Recorrência",
    cell: (row) => paymentFrequencyMapper[row.getValue() as TransactionFrequency].label,
  },
  {
    accessorKey: "startDate",
    header: "Inicia em",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "Finaliza em",
    cell: (row) => (row.getValue() ? new Date(row.getValue() as string).toLocaleDateString() : "-"),
  },
  {
    accessorKey: "expectedDayOfWeek",
    header: "Dia da semana",
    cell: (row) => row.getValue() ? convertIntToWeekday(row.getValue() as number) : "-",
  },
  {
    accessorKey: "expectedDayOfMonth",
    header: "Dia do mês",
    cell: (row) => row.getValue() ? row.getValue() as number : "-",
  },
  {
    accessorKey: "expectedMonthOfYear",
    header: "Mês do ano",
    cell: (row) => typeof row.getValue() === "number" ? convertIntToMonth(row.getValue() as number) : "-",
  }
  // {
  //   accessorKey: "id",
  //   header: "Ações",
  //   cell: (row) => <DeleteTransactionButton transactionId={row.getValue() as string} />,
  // },
]
