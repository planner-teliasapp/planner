"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { Stock } from "@/models/assets"
import { FixedIncome } from "@/models/assets/fixed-income"

export const columns: ColumnDef<FixedIncome>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "initialInvestment",
    header: "Aporte",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "currentValue",
    header: "Saldo Atual",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "dueDate",
    header: "Vencimento",
    cell: (row) => row.getValue() && new Date(row.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "fixedRate",
    header: "Pré (%)",
    cell: (row) => Number(row.getValue()).toFixed(2) + "%",
  },
  {
    accessorKey: "posFixedIndex",
    header: "Pós",
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
  },
]
