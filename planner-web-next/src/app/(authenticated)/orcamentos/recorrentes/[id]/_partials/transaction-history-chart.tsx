"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Loader2Icon } from "lucide-react"

interface Props {
  chartData: {
    month: string
    amount: number
  }[]
  isLoading?: boolean
}

const chartConfig = {
  amount: {
    label: "Valor",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function TransactionHistoryChart({ chartData, isLoading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico do valor</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[356px] max-h-[356px] flex justify-center items-center">
            <Loader2Icon className="size-16 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="max-h-[356px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                hide={true}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={5}
                width={100}
                tickFormatter={(value) => new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)}
                domain={["dataMin", "dataMax"]}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey="amount"
                type="linear"
                stroke="var(--color-amount)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )
        }
      </CardContent >
    </Card >
  )
}
