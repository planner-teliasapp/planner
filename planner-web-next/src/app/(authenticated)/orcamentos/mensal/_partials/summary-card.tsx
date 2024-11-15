"use client"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon, PiggyBankIcon } from "lucide-react"
import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  title: string
  amount?: number | undefined | null
  Icon?: LucideIcon
  useSecondaryBackground?: boolean
  amountTextClassName?: ClassNameValue
  className?: ClassNameValue
}

export default function SummaryCard({ title, amount = 0, Icon, useSecondaryBackground, className, amountTextClassName }: Props) {
  const [progress, setProgress] = useState({
    previous: 0,
    current: 0
  })

  useEffect(() => {
    setProgress(curr => {
      return {
        previous: curr.current,
        current: amount || 0
      }
    })
  }, [amount])

  return (
    <Card className={cn("w-full", useSecondaryBackground && "bg-transparent", className)}>
      <CardHeader className="flex flex-row justify-start items-center gap-4 pb-2">
        {Icon && (
          <div className="bg-muted p-2 rounded-md">
            <Icon size={24} />
          </div>
        )}
        <h2 className="text-muted-foreground text-sm">{title}</h2>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <p className='mt-2 text-base text-muted-foreground'>
          R$ <CountUp start={progress.previous} end={progress.current} duration={1} decimals={2} separator=" " decimal="," className={cn("text-foreground font-medium text-3xl sm:text-xl", amountTextClassName)} /></p>
      </CardContent>
    </Card>
  )
}
