"use client"

import { Transaction } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import DeleteTransactionButton from "../../../_partials/delele-transaction-button"
import { cn, formatCurrency } from "@/lib/utils"
import { paymentMethodMapper, transactionMapper } from "../../../_utils"
import { PaymentMethod, TransactionType } from "@prisma/client"
import { Edit2Icon } from "lucide-react"
import EditTransactionButton from "../../../_partials/edit-transaction-button"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
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
    accessorKey: "date",
    header: "Data",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "id",
    header: "Ações",
    cell: (row) => (
      <div className="flex justify-start items-center gap-1">
        <EditTransactionButton transactionId={row.getValue() as string} />
        <DeleteTransactionButton transactionId={row.getValue() as string} />
      </div>
    ),
  },
]
