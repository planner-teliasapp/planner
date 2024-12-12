"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import TickerOrdersTable from "./_partials/ticker-orders-table"
import { useAssets } from "@/hooks/use-assets"
import CreateTickerOrderButton from "../../_partials/create-ticker-order-button"
import { CreateTickerOrderDto } from "@/models/assets/ticker-order"

export default function TickerOrdensPage() {
  const { tickerOrders, isLoadingTickerOrders, createTickerOrder, isCreatingTickerOrder } = useAssets()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(data: CreateTickerOrderDto) {
    try {
      await createTickerOrder(data)
      toast({
        title: "Ordem cadastrada com sucesso",
      })
    } catch (err) {

      const error = err as Error

      toast({
        title: "Erro ao cadastrar ordem",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Ordens</H1>
        </div>
        <CreateTickerOrderButton onSubmit={onSubmit} isLoading={isCreatingTickerOrder} />
      </div>
      <div className='pt-6'>
        <TickerOrdersTable orders={tickerOrders} isLoading={isLoadingTickerOrders} />
      </div>
    </div>
  )
}
