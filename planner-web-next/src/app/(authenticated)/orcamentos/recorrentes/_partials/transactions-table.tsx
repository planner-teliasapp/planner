"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { RecurringTransaction } from "@/models/transaction"

interface Props {
  transactions?: RecurringTransaction[]
  isLoading?: boolean
}

export default function RecurringTransactionsTable({ transactions = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={transactions} isLoading={isLoading} />
  )
}
