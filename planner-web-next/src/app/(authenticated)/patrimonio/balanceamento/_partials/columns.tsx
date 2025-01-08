"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { BalanceColumn } from "./balance-table"

export const columns: ColumnDef<BalanceColumn>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: "Saldo Atual",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "amountPercentage",
    header: "% Atual",
    cell: (row) => formatPercentage(row.getValue() as number),
  },
  {
    accessorKey: "plannedPercentage",
    header: "% Planejado",
    cell: (row) => formatPercentage(row.getValue() as number),
  },
  {
    accessorKey: "plannedAmount",
    header: "Saldo Planejado",
    cell: (row) => formatCurrency(row.getValue() as number),
  },
  {
    accessorKey: "correction",
    header: "Correção",
    cell: (row) => formatCurrency(row.getValue() as number),
  }
]
