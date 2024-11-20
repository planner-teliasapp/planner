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
} from "@/components/ui/chart"
import { ClassNameValue } from "tailwind-merge"
import { cn, convertIntToMonth } from "@/lib/utils"
import { ITransactionSummary } from "@/models/transaction"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  summary?: ITransactionSummary
  year: number
  month: number
  isLoading?: boolean
  className?: ClassNameValue
}

export default function SummaryChart({ summary, year, month, className, isLoading }: Props) {

  const chartData = [
    { label: "balance", value: summary?.balance, fill: "var(--color-balance)" },
    { label: "expenses", value: summary?.expense, fill: "var(--color-expenses)" },
    { label: "investments", value: summary?.invested, fill: "var(--color-investments)" },
    { label: "wallets", value: summary?.wallet, fill: "var(--color-wallets)" }
  ]

  const chartConfig = {
    value: {
      label: "Receitas",
    },
    expenses: {
      label: "Despesas",
      color: "hsl(var(--chart-1))",
    },
    investments: {
      label: "Investimentos",
      color: "hsl(var(--chart-2))",
    },
    wallets: {
      label: "Caixinhas",
      color: "hsl(var(--chart-3))",
    },
    balance: {
      label: "Saldo",
      color: "hsl(var(--chart-4))",
    }

  } satisfies ChartConfig

  return (
    <Card className={cn("flex flex-col w-full", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Orçamento Mensal</CardTitle>
        <CardDescription>{convertIntToMonth(month)} de {year}</CardDescription>
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
                            className="fill-foreground text-2xl font-bold"
                          >
                            {summary?.income.toFixed(2)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Receitas
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
