"use client"

import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from "@/components/ui/sheet"
import GroupCard from "./task-list-card"
import CreateTaskListForm from "./create-task-list-form"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { TaskList } from "@/models/task-list"

interface Props {
  lists?: TaskList[]
  header?: string
  className?: ClassNameValue
}

export default function TaskListSection({ lists = [], className, header = "Listas" }: Props) {
  // const { groups } = useTasks();
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
              <SheetTitle>Adicionar novo grupo</SheetTitle>
            </SheetHeader>
            <CreateTaskListForm onSuccessfulSubmit={onSuccessfulSubmit} />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <ul className=''>
          {lists?.map(list => (
            <GroupCard list={list} key={list.id} />
          ))}
        </ul>
        {lists?.length === 0 && (
          <p className='text-muted-foreground text-center'>Nenhum grupo cadastrado</p>
        )}
      </CardContent>
    </Card>
  )
}