"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { useBudgets } from "@/hooks/use-budgets"

export default function TransactionsTable() {
  const { transactions } = useBudgets()

  return (
    <DataTable columns={columns} data={transactions?.items || []} />
  )
}
