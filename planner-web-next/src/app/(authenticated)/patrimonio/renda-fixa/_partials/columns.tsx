"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cn, formatCurrency } from "@/lib/utils"
import { Stock } from "@/models/assets"
import { FixedIncome } from "@/models/assets/fixed-income"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { fixedIncomeIndexTypeMapper } from "../../_utils"
import { PosFixedIndexType } from "@prisma/client"

export const columns: ColumnDef<FixedIncome>[] = [
  {
    accessorKey: "description",
    header: () => <p className="min-w-36">Ativo</p>,
    cell: (row) => <p className="line-clamp-1">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "initialInvestment",
    header: () => <p className="text-center min-w-32">Aporte</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "currentValue",
    header: () => <p className="text-center min-w-32">Saldo Atual</p>,
    cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "profit",
    header: () => <p className="text-center min-w-32">Lucro</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{formatCurrency(row.getValue() as number)}</p>,
  },
  {
    accessorKey: "profitPercentage",
    header: () => <p className="text-center min-w-24">Lucro (%)</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) > 0 ? "text-success" : Number(row.getValue()) < 0 ? "text-destructive" : "")}
    >{Number(row.getValue()).toFixed(2) + "%"}</p>,
  },
  {
    accessorKey: "date",
    header: () => <p className="text-center">Data</p>,
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MM/yyyy", {
      locale: ptBR
    })}</p>,
  },
  {
    accessorKey: "dueDate",
    header: () => <p className="text-center">Vencimento</p>,
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MM/yyyy", {
      locale: ptBR
    })}</p>,
  },
  {
    accessorKey: "remainingDays",
    header: () => <p className="text-center min-w-28">Dias restantes</p>,
    cell: (row) => <p
      className={cn("text-center font-semibold", Number(row.getValue()) < 90 ? "text-success font-bold" : "")}
    >{row.getValue() as string}</p>,
  },
  {
    accessorKey: "pastDays",
    header: () => <p className="text-center min-w-28">Dias passados</p>,
    cell: (row) => <p className="text-center">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "fixedRate",
    header: () => <p className="text-center">Pré (%)</p>,
    cell: (row) => <p className="text-center">{Number(row.getValue()).toFixed(2) + "%"}</p>,
  },
  {
    accessorKey: "posFixedIndex",
    header: () => <p className="text-center">Pós</p>,
    cell: (row) => <p className="text-center">{fixedIncomeIndexTypeMapper[row.getValue() as PosFixedIndexType].label}</p>,
  },
  {
    accessorKey: "taxRate",
    header: () => <p className="text-center">IR (%)</p>,
    cell: (row) => <p className="text-center">{Number(row.getValue()).toFixed(2) + "%"}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: () => <p className="text-center min-w-28">Atualizado em</p>,
    cell: (row) => <p className="text-center">{format(new Date(row.getValue() as string), "dd/MM/yyyy", {
      locale: ptBR
    })}</p>,
  },
]
