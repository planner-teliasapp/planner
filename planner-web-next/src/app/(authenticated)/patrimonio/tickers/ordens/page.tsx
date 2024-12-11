"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import TickerOrdersTable from "./_partials/ticker-orders-table"
import { useAssets } from "@/hooks/use-assets"

export default function TickerOrdensPage() {
  const { tickerOrders, isLoadingTickerOrders } = useAssets()
  const router = useRouter()
  const { toast } = useToast()

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Ordens</H1>
        </div>
        {/* <CreateTickerButton onSubmit={onSubmit} isLoading={isCreatingTicker} /> */}
      </div>
      <div className='pt-6'>
        <TickerOrdersTable orders={tickerOrders} isLoading={isLoadingTickerOrders} />
      </div>
    </div>
  )
}
