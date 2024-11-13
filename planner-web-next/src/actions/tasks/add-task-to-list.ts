"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Task, UpdateTaskDto } from "@/models/task"

export async function addTaskToListAction({ taskId, taskListId }: { taskId: string, taskListId: string }): Promise<string> {

  const task = await prismaClient.task.update({
    where: {
      id: taskId
    },
    data: {
      taskListId
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