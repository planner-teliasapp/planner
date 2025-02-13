"use client"

import { Transaction } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import DeleteTransactionButton from "../../../_partials/delele-transaction-button"
import { cn, formatCurrency } from "@/lib/utils"
import { paymentMethodMapper, transactionMapper } from "../../../_utils"
import { PaymentMethod, TransactionType } from "@prisma/client"
import { ArrowUpDown, Edit2Icon } from "lucide-react"
import EditTransactionButton from "../../../_partials/edit-transaction-button"
import { Button } from "@/components/ui/button"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"

export const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full min-w-56"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
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
    header: () => <p className="text-center">Método de pagamento</p>,
    cell: (row) => <p className="text-center">{paymentMethodMapper[row.getValue() as PaymentMethod].label}</p>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full min-w-56"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MMM/yyyy", {
      locale: ptBR
    })}</p>,
  },
  {
    accessorKey: "id",
    header: () => <p className="text-center">Ações</p>,
    cell: (row) => (
      <div className="flex justify-center items-center gap-1">
        <EditTransactionButton transactionId={row.getValue() as string} />
        <DeleteTransactionButton transactionId={row.getValue() as string} />
      </div>
    ),
  },
]
