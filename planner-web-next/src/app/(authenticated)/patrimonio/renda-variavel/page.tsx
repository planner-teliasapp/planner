"use client"

import { Button } from "@/components/ui/button"
import { H1, H2 } from "@/components/ui/typography"
import { useAssets } from "@/hooks/use-assets"
import { ChevronLeftIcon, Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import AutoUpdateTickersButton from "../_partials/auto-update-tickers-button"
import StocksTable from "./_partials/stocks-table"
import { tickerTypeMapper } from "../_utils"
import { TickerType } from "@prisma/client"
import { useMemo } from "react"

export default function RendaVariavelPage() {
  const { assets, isLoadingAssets } = useAssets()
  const router = useRouter()

  const stocks = useMemo(() => assets?.variableIncome.stocks, [assets])
  const reits = useMemo(() => assets?.variableIncome.reits, [assets])
  const internationalStocks = useMemo(() => assets?.variableIncome.internationalStocks, [assets])
  const cryptos = useMemo(() => assets?.variableIncome.cryptos, [assets])
  const golds = useMemo(() => assets?.variableIncome.golds, [assets])
  const etfs = useMemo(() => assets?.variableIncome.etfs, [assets])

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Renda Variável</H1>
        </div>
        <AutoUpdateTickersButton />
      </div>
      {isLoadingAssets ? (
        <div className="w-full flex justify-center items-center">
          <Loader2Icon className='w-8 h-8 animate-spin' />
        </div>
      ) : (
        <div className='pt-6 space-y-8'>
          {(stocks?.length || 0) > 0 && (
            <div className="space-y-2">
              <H2>{tickerTypeMapper[TickerType.STOCK].label}</H2>
              <StocksTable stocks={stocks} isLoading={isLoadingAssets} />
            </div>
          )}
          {(reits?.length || 0) > 0 && (
            <div className="space-y-2">
              <H2>{tickerTypeMapper[TickerType.REIT].label}</H2>
              <StocksTable stocks={reits} isLoading={isLoadingAssets} />
            </div>
          )}
          {(internationalStocks?.length || 0) > 0 && (
            <div className="space-y-2">
              <H2>{tickerTypeMapper[TickerType.INTERNATIONAL].label}</H2>
              <StocksTable stocks={internationalStocks} isLoading={isLoadingAssets} />
            </div>
          )}
          {(cryptos?.length || 0) > 0 && (
            <div className="space-y-2">
              <H2>{tickerTypeMapper[TickerType.CRYPTO].label}</H2>
              <StocksTable stocks={cryptos} isLoading={isLoadingAssets} />
            </div>
          )}
          {(golds?.length || 0) > 0 && (
            <div className="space-y-2">
              <H2>{tickerTypeMapper[TickerType.GOLD].label}</H2>
              <StocksTable stocks={golds} isLoading={isLoadingAssets} />
            </div>
          )}
          {(etfs?.length || 0) > 0 && (
            <div className="space-y-2">
              <H2>{tickerTypeMapper[TickerType.ETF].label}</H2>
              <StocksTable stocks={etfs} isLoading={isLoadingAssets} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
