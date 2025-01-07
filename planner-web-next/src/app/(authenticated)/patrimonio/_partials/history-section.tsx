"use client"

import { AssetHistory } from "@/models/assets/asset-history"
import AssetsHistoryChart from "./history-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { H3, H4 } from "@/components/ui/typography"
import { formatCurrency, formatPercentage } from "@/lib/utils"

interface Props {
  assetHistory: AssetHistory[] | undefined
}

export default function HistorySection({ assetHistory }: Props) {
  const monthGains = AssetHistory.calculateMonthGains(assetHistory)

  return (
    <Card className="sm:col-span-10 w-full h-fullflex sm:block justify-center items-center">
      <CardHeader>
        <CardTitle>Patrimônio ao longo do tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full flex flex-row justify-center items-start gap-4">
          <AssetsHistoryChart data={assetHistory} className="w-4/5" />
          <div className="w-1/5 h-full flex flex-col justify-center items-start">
            <H3>Neste mês</H3>
            <div className="flex flex-row justify-between items-center w-full">
              <p>{formatCurrency(AssetHistory.calculateMonthGains(assetHistory).generalTotalGain)}</p>
              <p>{formatPercentage(AssetHistory.calculateMonthGains(assetHistory).generalTotalPercentage / 100, {
                appendSignage: true
              })}</p>
            </div>
            <div className="mt-4 w-full space-y-1">
              <GainCard
                title="Caixa"
                gain={monthGains.cashBoxGain}
                percentage={monthGains.cashBoxPercentage}
              />
              <GainCard
                title="Renda Fixa"
                gain={monthGains.fixedIncomeGain}
                percentage={monthGains.fixedIncomePercentage}
              />
              <GainCard
                title="Renda Variável"
                gain={monthGains.variableIncomeGain}
                percentage={monthGains.variableIncomePercentage}
              />
              <GainCard
                title="Previdência"
                gain={monthGains.pensionGain}
                percentage={monthGains.pensionPercentage}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  function GainCard(data: {
    title: string
    gain: number
    percentage: number
  }) {
    return (
      <div className="w-full">
        <H4>{data.title}</H4>
        <div className="flex flex-row justify-between items-center w-full text-muted-foreground">
          <p className="text-sm">{formatCurrency(data.gain)}</p>
          <p className="text-sm">{formatPercentage(data.percentage / 100, {
            appendSignage: true
          })}
          </p>
        </div>
      </div>
    )
  }
}
