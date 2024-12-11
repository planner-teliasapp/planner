"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { TickerType } from "@prisma/client"
import { TickerOrder } from "@/models/assets/ticker-order"
import { tickerTypeMapper } from "../../../_utils"

export const columns: ColumnDef<TickerOrder>[] = [
  {
    accessorKey: "ticker",
    header: "Ticker",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "tickerType",
    header: "Tipo",
    cell: (row) => tickerTypeMapper[row.getValue() as TickerType].label,
  },
  {
    accessorKey: "orderType",
    header: "Ordem",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: (row) => Number(row.getValue() as number),
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  }
]
