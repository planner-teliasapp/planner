"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import TickersTable from "./_partials/tickers-table"
import { useAssets } from "@/hooks/use-assets"
import CreateTickerButton from "../_partials/create-ticker-button"
import { CreateTickerDto } from "@/models/assets/ticker"
import { useToast } from "@/hooks/use-toast"
import AutoUpdateTickersButton from "../_partials/auto-update-tickers-button"
import { useUser } from "@/hooks/use-user"

export default function TickersPage() {
  const { tickers, isLoadingTickers, createTicker, isCreatingTicker } = useAssets()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(data: CreateTickerDto) {
    try {
      await createTicker(data)
      toast({
        title: "Ticker cadastrado com sucesso",
      })
    } catch (err) {

      const error = err as Error

      if (error.message === "Ticker already exists") {
        toast({
          title: "Erro ao cadastrar ticker",
          description: "Ticker já cadastrado",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Erro ao cadastrar ticker",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const { isValidUser } = useUser()

  if (!isValidUser) {
    return (
      <div className='py-4 max-w-screen-2xl mx-auto'>
        <H1>Você não tem permissão para acessar essa página</H1>
      </div>
    )
  }

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Tickers</H1>
        </div>
        <CreateTickerButton onSubmit={onSubmit} isLoading={isCreatingTicker} />
        <AutoUpdateTickersButton />
      </div>
      <div className='pt-6'>
        <TickersTable tickers={tickers} isLoading={isLoadingTickers} />
      </div>
    </div>
  )
}
