"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { OtherAsset } from "@/models/assets/other-asset"

interface Props {
  data?: OtherAsset[]
  isLoading?: boolean
}

export default function OtherAssetsTable({ data = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={data} isLoading={isLoading} />
  )
}
