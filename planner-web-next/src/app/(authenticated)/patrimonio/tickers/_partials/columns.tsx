"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { Ticker } from "@/models/assets/ticker"
import { tickerTypeMapper } from "../../_utils"
import { TickerType } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const columns: ColumnDef<Ticker>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Símbolo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-start, line-clamp-1">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{tickerTypeMapper[row.getValue() as TickerType].label}</p>,
  },
  {
    accessorKey: "price",
    header: () => <p className="text-center min-w-32">Preço</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "change",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : "text-destructive")}
    >{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "changePercent",
    header: () => <p className="text-center">Variação (%)</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold min-w-24", Number(row.getValue()) > 0 ? "text-success" : "text-destructive")}
    >{formatPercentage(Number(row.getValue()), { appendSignage: true })}</p>,
  },
  {
    accessorKey: "autoUpdate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atualização automática
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{row.getValue() ? "Sim" : "Não"}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atualizado em
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MMM/yyyy", {
      locale: ptBR
    })}</p>,
  }
]
