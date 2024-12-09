"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import TickersTable from "./_partials/tickers-table"
import { useAssets } from "@/hooks/use-assets"

export default function TickersPage() {
  const { tickers, isLoadingTickers } = useAssets()
  const router = useRouter()

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Tickers</H1>
        </div>
        {/* <CreateRecurringTransactionButton onSubmit={onSubmit} isLoading={isCreatingRecurringTransaction} /> */}
      </div>
      <div className='pt-6'>
        <TickersTable tickers={tickers} isLoading={isLoadingTickers} />
      </div>
    </div>
  )
}
