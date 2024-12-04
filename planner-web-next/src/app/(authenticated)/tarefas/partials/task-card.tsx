"use client"

import { useDraggable } from "@dnd-kit/core"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Trash2Icon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DialogTrigger } from "@/components/ui/dialog"
import { TaskStatus } from "@prisma/client"
import { Task } from "@/models/task"
import { useTasks } from "@/hooks/use-tasks"

interface Props {
  task: Task
  setTask: (task: Task) => void
}

export default function TaskCard({ task, setTask }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })

  const { updateTask, deleteTask } = useTasks()
  async function handleCheckedChange() {
    task.toggleStatus()
    await updateTask({ ...task })
  }

  async function handleDelete() {
    await deleteTask(task.id)
  }

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <li
          key={task.id}
          className='flex justify-start items-center gap-4 hover:bg-muted rounded p-2'
        >
          <Checkbox
            id={task.id}
            checked={task.status === TaskStatus.DONE}
            onCheckedChange={handleCheckedChange}
          />
          <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className='cursor-grab min-h-[44px] flex flex-col justify-center items-start gap-1'
            style={style}
          >
            <Label htmlFor={task.id} className='cursor-pointer leading-relaxed tracking-wide line-clamp-1'>{task.title}</Label>
            <span className='text-xs text-muted-foreground'>{task.listTitle}</span>
          </div>
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <DialogTrigger asChild>
          <ContextMenuItem
            onClick={() => {
              setTask(task)
            }}
          >Editar</ContextMenuItem>
        </DialogTrigger>
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