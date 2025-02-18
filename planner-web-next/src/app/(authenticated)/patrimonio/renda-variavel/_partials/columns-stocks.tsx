"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { Stock } from "@/models/assets"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticker
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "name",
    header: () => <p className="text-center min-w-36">Nome</p>,
    cell: (row) => <p className="line-clamp-1">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "agency",
    header: () => <p className="text-center w-28">Instituição</p>,
    cell: (row) => <p className="text-center w-28">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "quantity",
    header: () => <p className="text-center">Quantidade</p>,
    cell: (row) => <p className="text-center">{Number(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "meanPrice",
    header: () => <p className="text-center min-w-28">Preço Médio</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "price",
    header: () => <p className="text-center min-w-28">Preço</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full min-w-32"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "change",
    header: () => <p className="text-center">Variação</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "changePercent",
    header: () => <p className="text-center min-w-28">Variação (%)</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{formatPercentage(Number(row.getValue()))}</p>,
  },
  {
    accessorKey: "profit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rentabilidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "profitPercent",
    header: () => <p className="text-center min-w-36">Rentabilidade (%)</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{formatPercentage(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: () => <p className="text-center min-w-28">Atualizado em</p>,
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MMM/yyyy", {
      locale: ptBR
    })}</p>,
  },
]
