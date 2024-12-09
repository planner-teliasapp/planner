"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { RecurringTransaction } from "@/models/transaction"
import { Ticker } from "@/models/assets/ticker"

interface Props {
  tickers?: Ticker[]
  isLoading?: boolean
}

export default function TickersTable({ tickers = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={tickers} isLoading={isLoading} />
  )
}
