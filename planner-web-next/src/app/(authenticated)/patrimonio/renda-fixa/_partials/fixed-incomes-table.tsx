"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Stock } from "@/models/assets"

interface Props {
  stocks?: Stock[]
  isLoading?: boolean
}

export default function StocksTable({ stocks = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={stocks} isLoading={isLoading} />
  )
}
