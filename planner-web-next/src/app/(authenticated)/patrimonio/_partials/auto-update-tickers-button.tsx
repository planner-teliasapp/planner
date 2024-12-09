"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { useAssets } from "@/hooks/use-assets"
import { useToast } from "@/hooks/use-toast"

interface Props {
  className?: ClassNameValue
}

export default function AutoUpdateTickersButton({ className }: Props) {
  const { autoUpdateTickers, isAutoUpdatingTickers } = useAssets()
  const { toast } = useToast()

  async function handleAutoUpdateTickers() {
    try {
      await autoUpdateTickers()
      toast({
        title: "Tickers atualizados",
      })
    } catch (err) {
      const error = err as Error
      console.error(error)
      toast({
        title: "Erro ao atualizar tickers",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  return (
    <Button
      className={cn("w-full sm:w-fit", className)}
      isLoading={isAutoUpdatingTickers}
      onClick={handleAutoUpdateTickers}
    >
      <span>Atualizar Tickers</span>
      <PlusIcon />
    </Button>
  )
}
