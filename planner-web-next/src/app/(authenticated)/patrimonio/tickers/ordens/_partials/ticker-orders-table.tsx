"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { TickerOrder } from "@/models/assets/ticker-order"
import { useMemo } from "react"

interface Props {
  orders?: TickerOrder[]
  isLoading?: boolean
}

export default function TickerOrdersTable({ orders = [], isLoading }: Props) {

  const ordersWithMeanPrice = useMemo(() => TickerOrder.includeMeanPrice(orders), [orders])

  return (
    <DataTable columns={columns} data={ordersWithMeanPrice} isLoading={isLoading} />
  )
}
