"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { FixedIncome } from "@/models/assets/fixed-income"

interface Props {
  data?: FixedIncome[]
  isLoading?: boolean
}

export default function FixedIncomesTable({ data = [], isLoading }: Props) {
  return (
    <DataTable columns={columns} data={data} isLoading={isLoading} />
  )
}
