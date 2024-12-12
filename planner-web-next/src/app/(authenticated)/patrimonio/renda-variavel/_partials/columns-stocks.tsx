"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { Stock } from "@/models/assets"

export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: "symbol",
    header: "Ticker",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: (row) => Number(row.getValue() as number),
  },
  {
    accessorKey: "meanPrice",
    header: "Preço Médio",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "totalAmount",
    header: "Posição",
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
    accessorKey: "profit",
    header: "Rentabilidade",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "profitPercent",
    header: "Rentabilidade (%)",
    cell: (row) => Number(row.getValue()).toFixed(2) + "%",
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  },
]
