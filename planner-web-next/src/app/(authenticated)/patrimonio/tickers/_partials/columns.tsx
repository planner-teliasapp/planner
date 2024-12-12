"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { Ticker } from "@/models/assets/ticker"
import { tickerTypeMapper } from "../../_utils"
import { TickerType } from "@prisma/client"

export const columns: ColumnDef<Ticker>[] = [
  {
    accessorKey: "symbol",
    header: "Símbolo",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: (row) => tickerTypeMapper[row.getValue() as TickerType].label,
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "change",
    header: "Variação",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "changePercent",
    header: "Variação (%)",
    cell: (row) => Number(row.getValue()).toFixed(2) + "%",
  },
  {
    accessorKey: "autoUpdate",
    header: "Atualização automática",
    cell: (row) => row.getValue() ? "Sim" : "Não",
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  }
]
