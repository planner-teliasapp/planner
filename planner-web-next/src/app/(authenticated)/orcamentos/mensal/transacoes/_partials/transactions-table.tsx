"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { useBudgets } from "@/hooks/use-budgets"
import { Transaction } from "@/models/transaction"

interface Props {
  transactions?: Transaction[]
}

export default function TransactionsTable({ transactions = [] }: Props) {

  return (
    <DataTable columns={columns} data={transactions} />
  )
}
