"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ICreateFixedIncomeDto } from "@/models/assets/fixed-income"
import MassUpdateTable from "./_partials/mass-update-table"
import { useAssets } from "@/hooks/use-assets"
import { MassUpdatable } from "@/models/assets/mass-update"
import { useEffect, useState } from "react"
import { OthersAssetsTypes } from "@prisma/client"

export default function RendaFixaPage() {
  const { assets } = useAssets()
  const router = useRouter()
  const { toast } = useToast()
  const [data, setData] = useState<MassUpdatable[]>([])

  async function onSubmit(data: ICreateFixedIncomeDto) {
    try {
      console.log(data)
      toast({
        title: "Atualizado com sucesso",
      })
    } catch (err) {

      const error = err as Error

      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const fixedIncomes: MassUpdatable[] = assets?.fixedIncome.items.map(item => {
      return {
        id: item.id,
        description: item.description,
        value: item.currentValue,
        type: "FIXED_INCOME"
      }
    }) || []

    const cashBoxes: MassUpdatable[] = assets?.cashBox.items.map(item => {
      return {
        id: item.id,
        description: item.description,
        value: item.value,
        type: OthersAssetsTypes.CASH_BOX
      }
    }) || []

    const pensions: MassUpdatable[] = assets?.pension.items.map(item => {
      return {
        id: item.id,
        description: item.description,
        value: item.value,
        type: OthersAssetsTypes.PENSION
      }
    }) || []

    const properties: MassUpdatable[] = assets?.property.items.map(item => {
      return {
        id: item.id,
        description: item.description,
        value: item.value,
        type: OthersAssetsTypes.PROPERTY
      }
    }) || []

    setData([
      ...fixedIncomes,
      ...cashBoxes,
      ...pensions,
      ...properties
    ])
  }, [assets])

  function handleValueChange(id: string, value: string) {
    const newData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          value: parseFloat(value)
        }
      }
      return item
    })

    setData(newData)
  }

  function updateValues() {
    console.log(data)
  }

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Atualização em Massa</H1>
        </div>
        <Button onClick={updateValues}>Atualizar</Button>
      </div>
      <div className='pt-6'>
        <MassUpdateTable data={data} onValueChange={handleValueChange} />
      </div>
    </div>
  )
}
