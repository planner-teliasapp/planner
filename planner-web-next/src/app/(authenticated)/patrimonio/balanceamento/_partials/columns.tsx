"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { BalanceColumn } from "./balance-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<BalanceColumn>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Saldo Atual
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "amountPercentage",
    header: () => <p className="text-center">% Atual</p>,
    cell: (row) => <p className="text-center">{formatPercentage(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "plannedPercentage",
    header: () => <p className="text-center">% Planejado</p>,
    cell: (row) => <p className="text-center">{formatPercentage(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "plannedAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Saldo Planejado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "correction",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correção
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{formatCurrency(row.getValue() as number)}</p>,
  }
]
