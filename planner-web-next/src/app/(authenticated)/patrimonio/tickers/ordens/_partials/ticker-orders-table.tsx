"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { TickerOrder } from "@/models/assets/ticker-order"

interface Props {
  orders?: TickerOrder[]
  isLoading?: boolean
}

export default function TickerOrdersTable({ orders = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={orders} isLoading={isLoading} />
  )
}
