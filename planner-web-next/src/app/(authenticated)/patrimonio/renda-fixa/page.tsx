"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { useAssets } from "@/hooks/use-assets"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import FixedIncomesTable from "./_partials/fixed-incomes-table"

export default function RendaFixaPage() {
  const { assets, isLoadingAssets } = useAssets()

  const router = useRouter()
  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Tickers</H1>
        </div>
      </div>
      <div className='pt-6'>
        <FixedIncomesTable data={assets?.fixedIncome.data} isLoading={isLoadingAssets} />
      </div>
    </div>
  )
}
