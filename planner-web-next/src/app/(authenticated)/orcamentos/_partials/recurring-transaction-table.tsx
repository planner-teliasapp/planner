"use client"

import { DataTable } from "@/components/ui/data-table"
import { RecurringTransaction } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import { cn, convertIntToMonth, convertIntToWeekday, formatCurrency } from "@/lib/utils"
import { PaymentMethod, TransactionFrequency, TransactionType } from "@prisma/client"
import EditRecurringTransactionButton from "./edit-recurring-transaction-button"
import { paymentFrequencyMapper, paymentMethodMapper, transactionMapper } from "../_utils"
import Link from "next/link"
import { ArrowUpDown, EyeIcon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"


export const columns: ColumnDef<RecurringTransaction>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full min-w-56"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="line-clamp-1">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "referenceValue",
    header: () => <p className="text-center min-w-28">Valor</p>,
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => (
      <div className="flex justify-start items-center gap-2">
        <div className={cn("size-2 rounded-full", transactionMapper[row.getValue() as TransactionType].bgColor)}></div>
        <p>{transactionMapper[row.getValue() as TransactionType].label}</p>
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full min-w-36"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Método Pgto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => paymentMethodMapper[row.getValue() as PaymentMethod].label,
  },
  {
    accessorKey: "frequency",
    header: () => <p className="text-center">Recorrência</p>,
    cell: (row) => <p className="text-center">{paymentFrequencyMapper[row.getValue() as TransactionFrequency].label}</p>,
  },
  {
    accessorKey: "startDate",
    header: () => <p className="text-center min-w-24">Inicia em</p>,
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MMM/yyyy", {
      locale: ptBR
    })}</p>,
  },
  {
    accessorKey: "endDate",
    header: () => <p className="text-center min-w-24">Finaliza em</p>,
    cell: (row) => <p className="text-center">{(row.getValue() ? format(new Date(row.getValue() as string), "dd/MMM/yyyy", {
      locale: ptBR
    }) : "")}</p>,
  },
  {
    accessorKey: "expectedDayOfWeek",
    header: () => <p className="text-center min-w-24">Dia Semana</p>,
    cell: (row) => <p className="text-center">{row.getValue() ? convertIntToWeekday(row.getValue() as number) : "-"}</p>,
  },
  {
    accessorKey: "expectedDayOfMonth",
    header: () => <p className="text-center min-w-24">Dia Mês</p>,
    cell: (row) => <p className="text-center">{row.getValue() ? row.getValue() as number : "-"}</p>,
  },
  {
    accessorKey: "expectedMonthOfYear",
    header: () => <p className="text-center">Mês</p>,
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
          <EyeIcon />
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
    <DataTable
      columns={columns}
      data={transactions}
      isLoading={isLoading}
      enablePagination
      emptyMessage="Nenhuma transação cadastrada"
      filtering={{
        enableFiltering: true,
        field: "description",
        placeholder: "Buscar por descrição",
      }}
    />
  )
}
