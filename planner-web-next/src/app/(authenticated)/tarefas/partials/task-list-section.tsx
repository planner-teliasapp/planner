"use client"

import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from "@/components/ui/sheet"
import TaskListCard from "./task-list-card"
import CreateTaskListForm from "./create-task-list-form"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { TaskList } from "@/models/task-list"
import TaskListCardSkeleton from "./task-list-card-skeleton"

interface Props {
  lists?: TaskList[]
  header?: string
  className?: ClassNameValue
  isLoading?: boolean
}

export default function TaskListSection({ lists = [], className, header = "Listas", isLoading }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  function onSuccessfulSubmit() {
    setIsSheetOpen(false)
  }

  return (
    <Card className={cn("w-full sm:max-w-[296px]", className)}>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle>{header}</CardTitle>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary">
              <PlusIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Adicionar nova lista</SheetTitle>
            </SheetHeader>
            <CreateTaskListForm onSuccessfulSubmit={onSuccessfulSubmit} />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ul className=''>
            <TaskListCardSkeleton />
            <TaskListCardSkeleton />
            <TaskListCardSkeleton />
          </ul>
        ) : (
          <ul className=''>
            {lists?.map(list => (
              <TaskListCard list={list} key={list.id} />
            ))}
          </ul>
        )}
        {(!isLoading && lists?.length === 0) && (
          <p className='text-muted-foreground text-center'>Nenhuma lista cadastrada</p>
        )}
      </CardContent>
    </Card>
  )
}