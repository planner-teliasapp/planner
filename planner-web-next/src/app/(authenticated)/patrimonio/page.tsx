"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useAssets } from "@/hooks/use-assets"
import Link from "next/link"
import { otherAssetsTypeMapper } from "./_utils"
import { OthersAssetsTypes } from "@prisma/client"
import { ChevronLeftIcon, DollarSignIcon } from "lucide-react"
import { Caption, H1, H2 } from "@/components/ui/typography"
import { useRouter } from "next/navigation"
import SummaryCard from "./_partials/summary-card"
import AutoUpdateTickersButton from "./_partials/auto-update-tickers-button"
import AssetsSummaryChart from "./_partials/summary-chart"
import HistorySection from "./_partials/history-section"
import { cn } from "@/lib/utils"
import CountUp from "react-countup"

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
      <div className='grid grid-cols-2 sm:grid-cols-12 gap-4 pt-2'>
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
        <div className="col-span-2 sm:col-span-4 sm:col-start-9 row-start-6 sm:row-start-1 sm:row-span-2 w-full h-full flex sm:block border rounded-lg justify-center items-center">
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
        <div className="col-span-2 border rounded-lg p-4 flex sm:flex-col gap-2 justify-start">
          <div className="w-full">
            <span className="text-muted-foreground text-sm">Disponível</span>
            <p className='mt-2 text-base text-muted-foreground w-full text-center'>
              R$ <CountUp start={0} end={assets?.summary.shareAmount || 0} duration={1} decimals={2} separator=" " decimal="," className={cn("text-foreground font-medium text-3xl sm:text-base",)} />
            </p>
          </div>
          <div className="w-full">
            <Caption className="text-muted-foreground">Aportes no Mês</Caption>
            <p className='mt-2 text-base text-muted-foreground w-full text-center'>
              R$ <CountUp start={0} end={assets?.summary.financialInjectionAmount || 0} duration={1} decimals={2} separator=" " decimal="," className={cn("text-foreground font-medium text-3xl sm:text-base",)} />
            </p>
          </div>
        </div>
        <HistorySection
          assetHistory={assetHistory}
          className="col-span-2 sm:col-span-10 w-full h-full"
        />
        <div className="col-span-2 row-start-1 sm:row-auto w-full py-4 px-2 grid grid-cols-2 sm:grid-cols-1 gap-2 border rounded-lg justify-start items-center">
          <H2 className="col-span-2 sm:col-auto">Acesso Rápido</H2>
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
            href={"patrimonio/balanceamento"}
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
