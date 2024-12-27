"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useAssets } from "@/hooks/use-assets"
import Link from "next/link"
import { otherAssetsTypeMapper } from "./_utils"
import { OthersAssetsTypes } from "@prisma/client"
import { formatCurrency } from "@/lib/utils"
import { ChevronLeftIcon, DollarSignIcon } from "lucide-react"
import { H1 } from "@/components/ui/typography"
import { useRouter } from "next/navigation"
import SummaryCard from "./_partials/summary-card"

export default function PatrimonioPage() {
  const { assets, isLoadingAssets } = useAssets()
  const router = useRouter()

  return (
  // <div>
  //   <h1>Patrimônio - {formatCurrency(assets?.summary.totalAmount)}</h1>
  //   <div className="flex gap-4">
  //     <Link
  //       href={"patrimonio/tickers"}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       Tickers
  //     </Link>
  //     <Link
  //       href={"patrimonio/tickers/ordens"}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       Ordens
  //     </Link>
  //     <Link
  //       href={"patrimonio/renda-variavel"}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       Renda Variável
  //     </Link>
  //     <Link
  //       href={"patrimonio/renda-fixa"}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       Renda Fixa
  //     </Link>
  //     <Link
  //       href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.CASH_BOX].slug}`}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       {otherAssetsTypeMapper[OthersAssetsTypes.CASH_BOX].label}
  //     </Link>
  //     <Link
  //       href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.FINANCIAL_INJECTION].slug}`}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       {otherAssetsTypeMapper[OthersAssetsTypes.FINANCIAL_INJECTION].label}
  //     </Link>
  //     <Link
  //       href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.PENSION].slug}`}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       {otherAssetsTypeMapper[OthersAssetsTypes.PENSION].label}
  //     </Link>
  //     <Link
  //       href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.PROPERTY].slug}`}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       {otherAssetsTypeMapper[OthersAssetsTypes.PROPERTY].label}
  //     </Link>
  //     <Link
  //       href={`patrimonio/${otherAssetsTypeMapper[OthersAssetsTypes.SHARE].slug}`}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       {otherAssetsTypeMapper[OthersAssetsTypes.SHARE].label}
  //     </Link>
  //     <Link
  //       href={"patrimonio/atualizacao-em-massa"}
  //       className={buttonVariants({
  //         className: "mt-4",
  //       })}
  //     >
  //       Atualização em Massa
  //     </Link>
  //   </div>
  //   {/* <pre>{JSON.stringify(assets, null, 2)}</pre> */}
  // </div>

    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <div className="w-full flex justify-start items-center sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon /></Button>
          <H1 className="text-start w-full">Patrimônio</H1>
        </div>
        <Link
          href={"patrimonio/atualizacao-em-massa"}
          className={buttonVariants({
            className: "",
          })}
        >
          Atualização em Massa
        </Link>
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
          title="Caixa"
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.cashBoxAmount}
          useSecondaryBackground
        />
        <SummaryCard
          title="Renda Fixa"
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.fixedIncomeAmount}
          useSecondaryBackground
        />
        <div className="sm:col-span-4 sm:col-start-9 sm:row-start-1 sm:row-span-2 w-full h-full flex sm:block border rounded-lg justify-center items-center">
          <p>Gráfico 1</p>
        </div>

        <SummaryCard
          title="Renda Variável"
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.variableIncomeAmount}
          useSecondaryBackground
        />
        <SummaryCard
          title="Previdência"
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.pensionAmount}
          useSecondaryBackground
        />
        <SummaryCard
          title="Posses"
          className="sm:col-span-2"
          isLoading={isLoadingAssets}
          amount={assets?.summary.propertyAmount}
          useSecondaryBackground
        />
        <div className="sm:col-span-2 border rounded-lg">
          <p>Share: {assets?.summary.shareAmount}</p>
          <p>Aporte: {assets?.summary.financialInjectionAmount}</p>
        </div>
        <div className="sm:col-span-10 w-full h-80 flex sm:block border rounded-lg justify-center items-center">
          <p>Gráfico 2</p>
        </div>
        <div className="sm:col-span-2 w-full flex sm:block border rounded-lg justify-center items-center">

        </div>
      </div>
    </div >
  )
}
