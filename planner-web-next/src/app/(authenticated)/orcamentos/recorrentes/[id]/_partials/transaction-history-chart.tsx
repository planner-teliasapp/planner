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

interface Props {
  chartData: {
    month: string
    amount: number
  }[]
}

// const chartData = [
//   { month: "January", amount: 186 },
//   { month: "February", amount: 305 },
//   { month: "March", amount: 237 },
//   { month: "April", amount: 73 },
//   { month: "May", amount: 209 },
//   { month: "June", amount: 214 },
// ]

const chartConfig = {
  amount: {
    label: "Valor",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function TransactionHistoryChart({ chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico do valor</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
      </CardContent>
    </Card>
  )
}
