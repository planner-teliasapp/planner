"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateTaskDto } from "@/models/task"

export async function createTaskAction(data: CreateTaskDto, userId: string) {
  console.log(data)

  return prismaClient.task.create({
    data: {
      title: data.title,
      taskListId: data.listId,
      userId
    }
  })
}