"use client"

import { DataTable } from "@/components/ui/data-table"
import { IAssetsSummary } from "@/models/assets/assets"
import { columns } from "./columns"
import { useMemo } from "react"
import { H3 } from "@/components/ui/typography"

interface Props {
  data?: IAssetsSummary
  isLoading?: boolean
}

export interface BalanceColumn {
  description: string
  amount: number
  amountPercentage: number
  plannedPercentage: number
  plannedAmount: number
  correction: number
}

export default function AssetBalanceTable({ data, isLoading }: Props) {
  const plannedPercentage = {
    cashBox: 0.20,
    fixedIncome: 0.25,
    variableIncome: 0.27,
    stocks: 0.06,
    reits: 0.12,
    international: 0.06,
    gold: 0.015,
    crypto: 0.015,
    pension: 0.25,
    properties: 0.03
  }

  const globalData: BalanceColumn[] = useMemo(() => {
    return [
      {
        description: "Caixa",
        amount: data?.cashBoxAmount || 0,
        amountPercentage: data?.cashBoxPercentage || 0,
        plannedPercentage: plannedPercentage.cashBox,
        plannedAmount: plannedPercentage.cashBox * (data?.totalAmount || 0),
        correction: plannedPercentage.cashBox * (data?.totalAmount || 0) - (data?.cashBoxAmount || 0)
      },
      {
        description: "Renda Fixa",
        amount: data?.fixedIncomeAmount || 0,
        amountPercentage: data?.fixedIncomePercentage || 0,
        plannedPercentage: plannedPercentage.fixedIncome,
        plannedAmount: plannedPercentage.fixedIncome * (data?.totalAmount || 0),
        correction: plannedPercentage.fixedIncome * (data?.totalAmount || 0) - (data?.fixedIncomeAmount || 0)
      },
      {
        description: "Renda Variável",
        amount: data?.variableIncomeAmount || 0,
        amountPercentage: data?.variableIncomePercentage || 0,
        plannedPercentage: plannedPercentage.variableIncome,
        plannedAmount: plannedPercentage.variableIncome * (data?.totalAmount || 0),
        correction: plannedPercentage.variableIncome * (data?.totalAmount || 0) - (data?.variableIncomeAmount || 0)
      },
      {
        description: "Previdência",
        amount: data?.pensionAmount || 0,
        amountPercentage: data?.pensionPercentage || 0,
        plannedPercentage: plannedPercentage.pension,
        plannedAmount: plannedPercentage.pension * (data?.totalAmount || 0),
        correction: plannedPercentage.pension * (data?.totalAmount || 0) - (data?.pensionAmount || 0)
      },
      {
        description: "Propriedades",
        amount: data?.propertyAmount || 0,
        amountPercentage: data?.propertyPercentage || 0,
        plannedPercentage: plannedPercentage.properties,
        plannedAmount: plannedPercentage.properties * (data?.totalAmount || 0),
        correction: plannedPercentage.properties * (data?.totalAmount || 0) - (data?.propertyAmount || 0)
      }
    ]
  }, [data])

  const variableIncomeData: BalanceColumn[] = useMemo(() => {
    return [
      {
        description: "Ações",
        amount: data?.variableIncomeSummary.stocksAmount || 0,
        amountPercentage: data?.variableIncomeSummary.stocksGlobalPercentage || 0,
        plannedPercentage: plannedPercentage.stocks,
        plannedAmount: plannedPercentage.stocks * (data?.totalAmount || 0),
        correction: plannedPercentage.stocks * (data?.totalAmount || 0) - (data?.variableIncomeSummary.stocksAmount || 0)
      },
      {
        description: "FIIs",
        amount: data?.variableIncomeSummary.reitsAmount || 0,
        amountPercentage: data?.variableIncomeSummary.reitsGlobalPercentage || 0,
        plannedPercentage: plannedPercentage.reits,
        plannedAmount: plannedPercentage.reits * (data?.totalAmount || 0),
        correction: plannedPercentage.reits * (data?.totalAmount || 0) - (data?.variableIncomeSummary.reitsAmount || 0)
      },
      {
        description: "Internacional",
        amount: data?.variableIncomeSummary.internationalStocksAmount || 0,
        amountPercentage: data?.variableIncomeSummary.internationalStocksGlobalPercentage || 0,
        plannedPercentage: plannedPercentage.international,
        plannedAmount: plannedPercentage.international * (data?.totalAmount || 0),
        correction: plannedPercentage.international * (data?.totalAmount || 0) - (data?.variableIncomeSummary.internationalStocksAmount || 0)
      },
      {
        description: "Ouro",
        amount: data?.variableIncomeSummary.goldsAmount || 0,
        amountPercentage: data?.variableIncomeSummary.goldsGlobalPercentage || 0,
        plannedPercentage: plannedPercentage.gold,
        plannedAmount: plannedPercentage.gold * (data?.totalAmount || 0),
        correction: plannedPercentage.gold * (data?.totalAmount || 0) - (data?.variableIncomeSummary.goldsAmount || 0)
      },
      {
        description: "Criptomoeda",
        amount: data?.variableIncomeSummary.cryptosAmount || 0,
        amountPercentage: data?.variableIncomeSummary.cryptosGlobalPercentage || 0,
        plannedPercentage: plannedPercentage.crypto,
        plannedAmount: plannedPercentage.crypto * (data?.totalAmount || 0),
        correction: plannedPercentage.crypto * (data?.totalAmount || 0) - (data?.variableIncomeSummary.cryptosAmount || 0)
      }
    ]
  }, [data])

  return (
    <div className="space-y-4">
      <H3>Por Classe</H3>
      <DataTable columns={columns} data={globalData} isLoading={isLoading} />
      <H3>Na Renda Variável</H3>
      <DataTable columns={columns} data={variableIncomeData} isLoading={isLoading} />
    </div>
  )
}
