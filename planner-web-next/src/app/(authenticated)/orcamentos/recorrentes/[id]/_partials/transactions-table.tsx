"use client"

import { RecurringTransaction, Transaction } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import { cn, convertIntToMonth, convertIntToWeekday, formatCurrency } from "@/lib/utils"
import { PaymentMethod, TransactionFrequency, TransactionType } from "@prisma/client"
import { DataTable } from "@/components/ui/data-table"
import { paymentMethodMapper } from "../../../_utils"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: () => <p className="text-center">Data</p>,
    cell: (row) => <p className="text-center">{new Date(row.getValue() as string).toLocaleDateString()}</p>
  },
  {
    accessorKey: "amount",
    header: () => <p className="text-center">Valor</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => <p className="text-center">Método de Pagamento</p>,
    cell: (row) => <p className="text-center">{paymentMethodMapper[row.getValue() as PaymentMethod].label}</p>,
  },
  {
    accessorKey: "id",
    header: () => <p className="text-center">Ações</p>,
    cell: (row) => (
      <div className="flex justify-center items-center gap-1">
        {/* <EditRecurringTransactionButton
          transactionId={row.getValue() as string}
        /> */}
      </div>
    ),
  },
]

interface Props {
  transactions?: Transaction[]
  isLoading?: boolean
}

export default function TransactionsTable({ transactions = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={transactions} isLoading={isLoading} />
  )
}
