"use client"

import { cn } from "@/lib/utils"
import { useDroppable } from "@dnd-kit/core"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Trash2Icon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { TaskList } from "@/models/task-list"
import { useTasks } from "@/hooks/use-tasks"
import { useRouter } from "next/navigation"


interface Props {
  list: TaskList
}

export default function TaskListCard({ list }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: list.id,
  })

  const { deleteList } = useTasks()
  const router = useRouter()

  async function handleDelete() {
    await deleteList(list.id)
  }

  function handleClick() {
    router.push(`/tarefas/listas/${list.id}`)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li
          key={list.id}
          ref={setNodeRef}
          onClick={handleClick}
          className={cn("flex flex-col justify-start items-start hover:bg-muted rounded p-2 py-3 cursor-pointer gap-1", isOver && "bg-green-500")}>
          <Progress value={list.completionRate * 100} className='h-1' />
          <div className='flex justify-between items-start w-full'>
            <h3>{list.title}</h3>
            <span className='text-muted-foreground ml-1'>{(list.completionRate * 100).toFixed(0)}%</span>
          </div>
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Editar</ContextMenuItem>
        <ContextMenuItem
          onClick={handleDelete}
          className='text-destructive gap-2'
        >
          <Trash2Icon size={16} />
          <span>Excluir</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}