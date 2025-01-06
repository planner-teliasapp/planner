"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label, Pie, PieChart, YAxis } from "recharts"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AssetHistory } from "@/models/assets/asset-history"
import { format } from "date-fns"

interface Props {
  data?: AssetHistory[]
  isLoading?: boolean
  className?: ClassNameValue
}

export default function AssetsHistoryChart({ data, className, isLoading }: Props) {

  // Deixar o valor do fill igual ao valor do label e configurar a cor no chartConfig
  // const chartData = [
  //   { label: "cashBox", value: (summary?.cashBoxPercentage || 0) * 100, fill: "var(--color-cashBox)" },
  //   { label: "fixedIncome", value: (summary?.fixedIncomePercentage || 0) * 100, fill: "var(--color-fixedIncome)" },
  //   { label: "variableIncome", value: (summary?.variableIncomePercentage || 0) * 100, fill: "var(--color-variableIncome)" },
  //   { label: "pension", value: (summary?.pensionPercentage || 0) * 100, fill: "var(--color-pension)" },
  //   { label: "property", value: (summary?.propertyPercentage || 0) * 100, fill: "var(--color-property)" }
  // ]

  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ]

  const chartData = data?.map((item) => ({
    month: format(item.date, "MMM/yy"),
    cashbox: item.cashBoxesTotalValue,
    total: item.generalTotalValue,
  })) || []

  console.log(chartData)

  // const chartConfig = {
  //   value: {
  //     label: "Receitas",
  //   },
  //   cashBox: {
  //     label: "Caixa",
  //     color: "hsl(var(--chart-2))",
  //   },
  //   fixedIncome: {
  //     label: "Renda Fixa",
  //     color: "hsl(var(--chart-6))",
  //   },
  //   variableIncome: {
  //     label: "Renda Variável",
  //     color: "hsl(var(--chart-4))",
  //   },
  //   pension: {
  //     label: "Previdência",
  //     color: "hsl(var(--muted-foreground))",
  //   },
  //   property: {
  //     label: "Propriedades",
  //     color: "hsl(var(--chart-5))",
  //   }

  // } satisfies ChartConfig
  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    }
  } satisfies ChartConfig


  return (
    <Card className={cn("flex flex-col w-full", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Evolução do Patrimônio</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center items-center">
        {isLoading ? (
          <Skeleton className="mx-auto aspect-square max-h-[250px] mt-4" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto max-h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={5}
                width={100}
                tickFormatter={(value) => new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)
                }

                domain={["dataMin", "dataMax"]}

              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="total"
                type="natural"
                stroke="var(--color-total)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
