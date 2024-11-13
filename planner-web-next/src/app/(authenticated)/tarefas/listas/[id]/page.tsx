"use client"

import { H1 } from "@/components/ui/typography"
import { useTasks } from "@/hooks/use-tasks"
import { TaskList } from "@/models/task-list"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import TaskSection from "../../partials/task-section"

interface Props {
  params: {
    id?: string
  }
}

export default function TaskListIdPage({ params }: Props) {
  const [list, setList] = useState<TaskList | null | undefined>(null)
  const { lists } = useTasks()

  useEffect(() => {
    if (!params.id) notFound()

    const list = lists?.find(list => list.id === params.id)
    setList(list)
  }, [params, lists])

  return (
    <div className='flex flex-col justify-start items-start py-4 max-w-screen-xl mx-auto'>
      <H1>{list?.title}</H1>
      <TaskSection
        tasks={list?.tasks}
        header='Tarefas'
        className='mt-4'
        listId={params.id}
      />
    </div>
  )
}
