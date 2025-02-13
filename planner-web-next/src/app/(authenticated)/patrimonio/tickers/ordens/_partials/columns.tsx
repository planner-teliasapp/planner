"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cn, formatCurrency } from "@/lib/utils"
import { TickerOrderType, TickerType } from "@prisma/client"
import { ITickerOrderWithMeanPrice } from "@/models/assets/ticker-order"
import { tickerOrderTypeMapper, tickerTypeMapper } from "../../../_utils"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<ITickerOrderWithMeanPrice>[] = [
  {
    accessorKey: "ticker",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
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
    header: () => <p className="text-center min-w-36">Nome</p>,
    cell: (row) => <p className="text-start, line-clamp-1">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "tickerType",
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
    accessorKey: "orderType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordem
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p
      className={cn("text-center font-semibold", row.getValue() as TickerOrderType === TickerOrderType.BUY ? "text-success" : "text-destructive")}
    >{tickerOrderTypeMapper[row.getValue() as TickerOrderType].label}</p>,
  },
  {
    accessorKey: "price",
    header: () => <p className="text-center min-w-32">Preço</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "quantity",
    header: () => <p className="text-center">Quantidade</p>,
    cell: (row) => <p className="text-center">{Number(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MMM/yyyy", {
      locale: ptBR
    })}</p>,
  },
  {
    accessorKey: "previousMeanPrice",
    header: () => <p className="text-center min-w-40">Preço Médio Anterior</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "newMeanPrice",
    header: () => <p className="text-center min-w-40">Novo Preço Médio</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "newTotalQuantity",
    header: () => <p className="text-center min-w-36">Quantidade Atual</p>,
    cell: (row) => <p className="text-center">{Number(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "gain",
    header: () => <p className="text-center min-w-32">Ganhos</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{formatCurrency(row.getValue() as number)}</p>,
  }
]
