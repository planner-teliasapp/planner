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

export default function AssetsSummaryChart({ summary, className, isLoading }: Props) {

  // Deixar o valor do fill igual ao valor do label e configurar a cor no chartConfig
  const chartData = [
    { label: "cashBox", value: (summary?.cashBoxPercentage || 0) * 100, fill: "var(--color-cashBox)" },
    { label: "fixedIncome", value: (summary?.fixedIncomePercentage || 0) * 100, fill: "var(--color-fixedIncome)" },
    { label: "variableIncome", value: (summary?.variableIncomePercentage || 0) * 100, fill: "var(--color-variableIncome)" },
    { label: "pension", value: (summary?.pensionPercentage || 0) * 100, fill: "var(--color-pension)" },
    { label: "property", value: (summary?.propertyPercentage || 0) * 100, fill: "var(--color-property)" }
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
    <Card className={cn("flex flex-col w-full h-full", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição por Classe</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center items-center">
        {isLoading ? (
          <Skeleton className="mx-auto aspect-square max-h-[250px] mt-4" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <ChartLegend
                content={
                  <ChartLegendContent
                    className="flex flex-col gap-2 justify-start items-start"
                  />
                }
                align="right"
                verticalAlign="middle"
                layout="vertical"
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            100%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >

                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
