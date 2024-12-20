"use client"

import { buttonVariants } from "@/components/ui/button"
import { useAssets } from "@/hooks/use-assets"
import Link from "next/link"
import { otherAssetsTypeMapper } from "./_utils"
import { OthersAssetsTypes } from "@prisma/client"

export default function PatrimonioPage() {
  const { assets, isLoadingAssets } = useAssets()

  return (
    <div>
      <h1>Patrimônio</h1>
      <div className="flex gap-4">
        <Link
          href={"patrimonio/tickers"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Tickers
        </Link>
        <Link
          href={"patrimonio/tickers/ordens"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Ordens
        </Link>
        <Link
          href={"patrimonio/renda-variavel"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Renda Variável
        </Link>
        <Link
          href={"patrimonio/renda-fixa"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Renda Fixa
        </Link>
        <Link
          href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.CASH_BOX].slug}`}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          {otherAssetsTypeMapper[OthersAssetsTypes.CASH_BOX].label}
        </Link>
        <Link
          href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.FINANCIAL_INJECTION].slug}`}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          {otherAssetsTypeMapper[OthersAssetsTypes.FINANCIAL_INJECTION].label}
        </Link>
        <Link
          href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.PENSION].slug}`}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          {otherAssetsTypeMapper[OthersAssetsTypes.PENSION].label}
        </Link>
        <Link
          href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.PROPERTY].slug}`}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          {otherAssetsTypeMapper[OthersAssetsTypes.PROPERTY].label}
        </Link>
        <Link
          href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.SHARE].slug}`}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          {otherAssetsTypeMapper[OthersAssetsTypes.SHARE].label}
        </Link>


      </div>
    </div>
  )
}
