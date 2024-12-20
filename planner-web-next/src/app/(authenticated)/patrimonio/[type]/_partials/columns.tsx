"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { OtherAsset } from "@/models/assets/other-asset"
import { otherAssetsTypeMapper } from "../../_utils"
import { OthersAssetsTypes } from "@prisma/client"

export const columns: ColumnDef<OtherAsset>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: (row) => formatCurrency(row.getValue() as number),
  }
]
