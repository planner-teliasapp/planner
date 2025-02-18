"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { OtherAsset } from "@/models/assets/other-asset"

export const columns: ColumnDef<OtherAsset>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "agency",
    header: () => <p className="text-center w-28">Instituição</p>,
    cell: (row) => <p className="text-center w-28">{row.getValue() as string}</p>,
  },
  {
    accessorKey: "value",
    header: () => <p className="text-center">Valor</p>,
    cell: (row) => <p className="text-center">{formatCurrency(Number(row.getValue()))}</p>,
  },
  {
    accessorKey: "note",
    header: "Anotação",
  }
]
