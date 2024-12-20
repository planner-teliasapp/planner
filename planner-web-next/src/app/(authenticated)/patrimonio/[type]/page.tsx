"use client"

import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { ChevronLeftIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useAssets } from "@/hooks/use-assets"
import { useToast } from "@/hooks/use-toast"
import { getOtherAssetsDataBySlug } from "../_utils"
import { OtherAssets } from "@/models/assets"
import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/utils"
import OtherAssetsTable from "./_partials/other-assets-table"
import CreateOtherAssetsButton from "../_partials/create-other-assets-button"
import { ICreateOtherAssetDto } from "@/models/assets/other-asset"

export default function OutrosPage() {
  const { assets, isLoadingAssets, createOtherAssets, isCreatingOtherAssets } = useAssets()
  const router = useRouter()
  const { toast } = useToast()
  const { type } = useParams<{ type: string }>()
  const [asset, setAsset] = useState<OtherAssets | null>(null)

  async function onSubmit(data: ICreateOtherAssetDto) {
    try {
      await createOtherAssets(data)
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

  const slugData = getOtherAssetsDataBySlug(type)

  useEffect(() => {
    if (!assets) return
    if (slugData) {
      // @ts-ignore
      setAsset(assets[slugData.assetsKey])
    }
  }, [assets, slugData])

  if (!slugData) {
    return <div>Não encontrado</div>
  }

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">{slugData.labelPlural} - {formatCurrency(asset?.currentAmount)}</H1>
        </div>
        <CreateOtherAssetsButton onSubmit={onSubmit} isLoading={isLoadingAssets} defaultType={slugData.type} />
      </div>
      <div className='pt-6'>
        <OtherAssetsTable data={asset?.items} isLoading={isLoadingAssets} />
      </div>
    </div>
  )
}
