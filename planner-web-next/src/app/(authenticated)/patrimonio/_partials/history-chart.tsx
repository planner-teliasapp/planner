"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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

  const chartData = data?.map((item) => ({
    month: format(item.date, "MMM/yy"),
    cashbox: item.cashBoxesTotalValue,
    total: item.generalTotalValue,
  })) || []

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    }
  } satisfies ChartConfig

  return (
    <Card className={cn("flex flex-col w-full h-full bg-transparent", className)}>
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
