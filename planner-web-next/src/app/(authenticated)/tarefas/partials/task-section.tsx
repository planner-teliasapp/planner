"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import TaskCard from "./task-card"
import CreateTaskForm from "./create-task-form"
import { useState } from "react"
import { H2 } from "@/components/ui/typography"
import EditTaskForm from "./edit-task-form"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { TaskStatus } from "@prisma/client"
import { Task } from "@/models/task"

interface Props {
  tasks: Task[] | undefined | null
  header?: string
  className?: ClassNameValue
  listId?: string
  hideAddButton?: boolean
  hideCounter?: boolean
  maxItems?: number
}

export default function TaskSection({ tasks, header = "Minhas Tarefas", className, listId, hideAddButton, hideCounter, maxItems }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  function onSuccessfulSubmit() {
    setIsSheetOpen(false)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className='flex flex-row justify-between'>
        <div className='flex gap-2 justify-start items-baseline'>
          <H2>{header}</H2>
          {!hideCounter && (
            <p className='text-muted-foreground'><strong className='text-2xl text-muted-foreground'>{tasks?.filter(task => task.status === TaskStatus.DONE).length}</strong>/{tasks?.length}</p>
          )}
        </div>
        {!hideAddButton && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="secondary">
                <PlusIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Adicionar nova tarefa</SheetTitle>
              </SheetHeader>
              <CreateTaskForm onSuccessfulSubmit={onSuccessfulSubmit} listId={listId} />
            </SheetContent>
          </Sheet>
        )}
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

          <ul className=''>
            {tasks?.map((task, index) => {
              if (maxItems && index >= maxItems) return null
              return (
                <TaskCard task={task} setTask={setSelectedTask} key={task.id} />
              )
            })}
          </ul>
          {tasks?.length === 0 && (
            <p className='text-muted-foreground text-center'>Nenhuma tarefa cadastrada</p>
          )}

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
            </DialogHeader>
            <EditTaskForm
              task={selectedTask}
              onSuccessful={() => {
                setSelectedTask(null)
                setIsDialogOpen(false)
              }} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}