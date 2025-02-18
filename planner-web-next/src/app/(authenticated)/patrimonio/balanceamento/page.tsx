"use client"

import { Button } from "@/components/ui/button"
import { H1, H2 } from "@/components/ui/typography"
import { useAssets } from "@/hooks/use-assets"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import AssetsBalanceChart from "../_partials/balance-chart"
import AssetBalanceTable from "./_partials/balance-table"
import { formatCurrency } from "@/lib/utils"
import BalanceStrategySheet from "../_partials/balance-strategy-sheet"

export default function OutrosPage() {
  const router = useRouter()
  const { assets, isLoadingAssets, balanceStrategy, isLoadingBalanceStrategy } = useAssets()

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Balanceamento de Patrimônio</H1>
        </div>
        <BalanceStrategySheet />
      </div>
      <div className='pt-6 space-y-6'>
        <H2>Saldo Atual {formatCurrency(assets?.summary.totalAmount)}</H2>
        <AssetsBalanceChart
          summary={assets?.summary}
          isLoading={isLoadingAssets || isLoadingBalanceStrategy}
          strategy={balanceStrategy}
        />
        <AssetBalanceTable
          data={assets?.summary}
          isLoading={isLoadingAssets || isLoadingBalanceStrategy}
          strategy={balanceStrategy}
        />
      </div>
    </div>
  )
}
