"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { useAssets } from "@/hooks/use-assets"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import FixedIncomesTable from "./_partials/fixed-incomes-table"
import CreateFixedIncomeButton from "../_partials/create-fixed-income-button"
import { useToast } from "@/hooks/use-toast"
import { ICreateFixedIncomeDto } from "@/models/assets/fixed-income"
import { formatCurrency } from "@/lib/utils"

export default function RendaFixaPage() {
  const { assets, isLoadingAssets, createFixedIncome, isCreatingFixedIncome } = useAssets()

  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(data: ICreateFixedIncomeDto) {
    try {
      await createFixedIncome(data)
      toast({
        title: "Cadastrado com sucesso",
      })
    } catch (err) {

      const error = err as Error

      toast({
        title: "Erro ao cadastrar",
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
          <H1 className="text-start w-full">Renda Fixa - {formatCurrency(assets?.fixedIncome.currentAmount)}</H1>
        </div>
        <CreateFixedIncomeButton onSubmit={onSubmit} isLoading={isCreatingFixedIncome} />
      </div>

      <div className='pt-6'>
        <FixedIncomesTable data={assets?.fixedIncome.items} isLoading={isLoadingAssets} />
      </div>
    </div>
  )
}
