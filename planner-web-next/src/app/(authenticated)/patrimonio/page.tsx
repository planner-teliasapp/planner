"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useAssets } from "@/hooks/use-assets"
import Link from "next/link"
import { otherAssetsTypeMapper } from "./_utils"
import { OthersAssetsTypes } from "@prisma/client"
import { ChevronLeftIcon, DollarSignIcon } from "lucide-react"
import { Caption, H1, H2, P } from "@/components/ui/typography"
import { useRouter } from "next/navigation"
import SummaryCard from "./_partials/summary-card"
import AutoUpdateTickersButton from "./_partials/auto-update-tickers-button"
import AssetsSummaryChart from "./_partials/summary-chart"
import HistorySection from "./_partials/history-section"
import { formatCurrency, formatPercentage } from "@/lib/utils"

export default function PatrimonioPage() {
  const { assets, isLoadingAssets, assetHistory } = useAssets()
  const router = useRouter()

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Patrimônio</H1>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2'>
        <SummaryCard
          title="Saldo"
          className="sm:col-span-4"
          isLoading={isLoadingAssets}
          amount={assets?.summary.totalAmount}
          Icon={DollarSignIcon}
          amountTextClassName="sm:text-4xl" />
        <SummaryCard
          title={otherAssetsTypeMapper[OthersAssetsTypes.CASH_BOX].label}
          linkUrl={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.CASH_BOX].slug}`}
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.cashBoxAmount}
          useSecondaryBackground
        />
        <SummaryCard
          title="Renda Fixa"
          linkUrl="patrimonio/renda-fixa"
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.fixedIncomeAmount}
          useSecondaryBackground
        />
        <div className="sm:col-span-4 sm:col-start-9 sm:row-start-1 sm:row-span-2 w-full h-full flex sm:block border rounded-lg justify-center items-center">
          <AssetsSummaryChart summary={assets?.summary} isLoading={isLoadingAssets} />
        </div>

        <SummaryCard
          title="Renda Variável"
          linkUrl="patrimonio/renda-variavel"
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.variableIncomeAmount}
          useSecondaryBackground
        />
        <SummaryCard
          title={otherAssetsTypeMapper[OthersAssetsTypes.PENSION].label}
          linkUrl={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.PENSION].slug}`}
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.pensionAmount}
          useSecondaryBackground
        />
        <SummaryCard
          title={otherAssetsTypeMapper[OthersAssetsTypes.PROPERTY].labelPlural}
          linkUrl={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.PROPERTY].slug}`}
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.propertyAmount}
          useSecondaryBackground
        />
        <div className="sm:col-span-2 border rounded-lg p-4 space-y-1">
          <Caption className="text-muted-foreground">Disponível</Caption>
          <P>{formatCurrency(assets?.summary.shareAmount)} - {formatPercentage(assets?.summary.sharePercentage)}</P>
          <Caption className="text-muted-foreground">Aportes no Mês</Caption>
          <P>{formatCurrency(assets?.summary.financialInjectionAmount)}</P>
        </div>
        <HistorySection assetHistory={assetHistory} />
        <div className="sm:col-span-2 w-full py-4 px-2 flex flex-col gap-2 border rounded-lg justify-start items-center">
          <H2>Acesso Rápido</H2>
          <Link
            href={"patrimonio/atualizacao-em-massa"}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Atualização em Massa
          </Link>
          <Link
            href={"patrimonio/tickers"}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Tickers
          </Link>
          <AutoUpdateTickersButton className="sm:w-full" />
          <Link
            href={"patrimonio/tickers/ordens"}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Ordens
          </Link>
          <Link
            href={"patrimonio/atualizacao-em-massa"}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Balanceamento
          </Link>
        </div>
      </div>
    </div >
  )
}
