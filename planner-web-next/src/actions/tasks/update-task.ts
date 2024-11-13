"use server"

import TaskCard from "@/app/(authenticated)/tarefas/partials/task-card"
import { prismaClient } from "@/lib/prisma-client"
import { Task, UpdateTaskDto } from "@/models/task"

export async function updateTaskAction(data: UpdateTaskDto): Promise<string> {
  const { id } = data

  const task = await prismaClient.task.update({
    where: {
      id
    },
    data: {
      title: data.title,
      status: data.status,
      completedAt: data.completedAt
    },
    include: {
      TaskList: {
        select: {
          title: true,
          id: true
        }
      }
    }
  })

  return JSON.stringify(Task.fromPrisma(task))
}