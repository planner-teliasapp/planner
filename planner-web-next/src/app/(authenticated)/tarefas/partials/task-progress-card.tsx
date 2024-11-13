"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Caption } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ClassNameValue } from "tailwind-merge"
import { format } from "date-fns"
import CountUp from "react-countup"
import { TaskStatus } from "@prisma/client"
import { Task } from "@/models/task"

interface Props {
  header?: string
  tasks: Task[] | undefined | null
  className?: ClassNameValue
}

export default function TaskProgressCard({ header = "Progresso", tasks, className }: Props) {
  const [progress, setProgress] = useState({
    previous: 0,
    current: 0
  })
  const today = new Date()

  useEffect(() => {
    if (tasks) {
      const total = tasks.length
      const completed = tasks.filter(task => task.status === TaskStatus.DONE).length
      setProgress(value => {
        return {
          previous: value.current,
          current: Math.round((completed / total) * 100)
        }
      })
    }
  }, [tasks])

  return (
    <Card className={cn("", className)}>
      <CardContent className='flex flex-col justify-center items-center p-8'>
        <Caption className="text-muted-foreground">{header}</Caption>
        <p className='mt-2 text-xl text-muted-foreground'>
          <CountUp start={progress.previous} end={progress.current} duration={1} decimals={0} className='text-foreground font-medium text-6xl' />%</p>
        <span className='mt-1 text-sm text-muted-foreground'>de {tasks?.length} tarefas</span>
        <p className='mt-6 text-muted-foreground'><strong className='font-semibold text-primary text-lg'>{format(today, "d")}</strong>{format(today, " MMM 'de' yyyy")}</p>
      </CardContent>
    </Card>
  )
}