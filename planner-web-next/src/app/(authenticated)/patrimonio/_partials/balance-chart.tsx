"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { IAssetsSummary } from "@/models/assets/assets"

interface Props {
  summary?: IAssetsSummary
  isLoading?: boolean
  className?: ClassNameValue
}

export default function AssetsBalanceChart({ summary, className, isLoading }: Props) {

  // Deixar o valor do fill igual ao valor do label e configurar a cor no chartConfig
  const chartData = [
    { label: "cashBox", value: (summary?.cashBoxPercentage || 0) * 100, fill: "var(--color-cashBox)" },
    { label: "fixedIncome", value: (summary?.fixedIncomePercentage || 0) * 100, fill: "var(--color-fixedIncome)" },
    { label: "variableIncome", value: (summary?.variableIncomePercentage || 0) * 100, fill: "var(--color-variableIncome)" },
    { label: "pension", value: (summary?.pensionPercentage || 0) * 100, fill: "var(--color-pension)" },
    { label: "property", value: (summary?.propertyPercentage || 0) * 100, fill: "var(--color-property)" }
  ]

  const chartData2 = [
    { label: "cashBox", value: (0.25) * 100, fill: "var(--color-cashBox)" },
    { label: "fixedIncome", value: (0.25) * 100, fill: "var(--color-fixedIncome)" },
    { label: "variableIncome", value: (0.25) * 100, fill: "var(--color-variableIncome)" },
    { label: "pension", value: (0.15) * 100, fill: "var(--color-pension)" },
    { label: "property", value: (0.1) * 100, fill: "var(--color-property)" }
  ]

  const chartConfig = {
    value: {
      label: "Receitas",
    },
    cashBox: {
      label: "Caixa",
      color: "hsl(var(--chart-2))",
    },
    fixedIncome: {
      label: "Renda Fixa",
      color: "hsl(var(--chart-6))",
    },
    variableIncome: {
      label: "Renda Variável",
      color: "hsl(var(--chart-4))",
    },
    pension: {
      label: "Previdência",
      color: "hsl(var(--muted-foreground))",
    },
    property: {
      label: "Propriedades",
      color: "hsl(var(--chart-5))",
    }

  } satisfies ChartConfig

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-4">
      <Card className={cn("flex flex-col w-full sm:col-span-5", className)}>
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribuição Atual</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 justify-center items-center">
          {isLoading ? (
            <Skeleton className="mx-auto aspect-square max-h-[250px] mt-4" />
          ) : (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                  strokeWidth={5}
                >
                </Pie>
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
      <Card className={cn("flex flex-col w-full sm:col-span-5", className)}>
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribuição Planejada</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 justify-center items-center">
          {isLoading ? (
            <Skeleton className="mx-auto aspect-square max-h-[250px] mt-4" />
          ) : (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData2}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                  strokeWidth={5}
                >
                </Pie>
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
      <Card className="flex flex-col w-full sm:col-span-2">
        <CardHeader>
          <CardTitle>Legenda</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col justify-between gap-2">
          <Caption label="Caixa" color={chartConfig.cashBox.color} />
          <Caption label="Renda Fixa" color={chartConfig.fixedIncome.color} />
          <Caption label="Renda Variável" color={chartConfig.variableIncome.color} />
          <Caption label="Previdência" color={chartConfig.pension.color} />
          <Caption label="Propriedades" color={chartConfig.property.color} />
        </CardContent>
      </Card>
    </div>
  )

  function Caption(props: { label: string, color: string }) {
    return (
      <div className="w-full flex justify-start items-center gap-2">
        <div className="size-5 rounded" style={{ backgroundColor: props.color }}></div>
        <span>{props.label}</span>
      </div>
    )
  }
}
