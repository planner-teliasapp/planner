"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateTaskDto, Task } from "@/models/task"

export async function createTaskAction(data: CreateTaskDto, userId: string) {
  console.log(data)

  const task = await prismaClient.task.create({
    data: {
      title: data.title,
      taskListId: data.listId,
      userId
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