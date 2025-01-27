"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Transaction } from "@/models/transaction"

interface Props {
  transactions?: Transaction[]
  isLoading?: boolean
}

export default function TransactionsTable({ transactions = [], isLoading }: Props) {
  return (
    <DataTable
      columns={columns}
      data={transactions}
      isLoading={isLoading}
    />
  )
}
