"use client"

import { Button } from "@/components/ui/button"
import { H1, H2 } from "@/components/ui/typography"
import { useAssets } from "@/hooks/use-assets"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import AutoUpdateTickersButton from "../_partials/auto-update-tickers-button"
import StocksTable from "./_partials/stocks-table"

export default function RendaVariavelPage() {
  const { assets, isLoadingAssets } = useAssets()
  const router = useRouter()

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Renda Variável</H1>
        </div>
        <AutoUpdateTickersButton />
      </div>
      <div className='pt-6'>
        <div className="space-y-2">
          <H2>Ações</H2>
          <StocksTable stocks={assets?.variableIncome.stocks} isLoading={isLoadingAssets} />
        </div>
      </div>
    </div>
  )
}
