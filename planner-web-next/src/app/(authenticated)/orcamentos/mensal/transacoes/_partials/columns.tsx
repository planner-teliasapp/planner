"use client"

import { Transaction } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import DeleteTransactionButton from "../../../_partials/delele-transaction-button"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "id",
    header: "Ações",
    cell: (row) => <DeleteTransactionButton transactionId={row.getValue() as string} />,
  },
]
