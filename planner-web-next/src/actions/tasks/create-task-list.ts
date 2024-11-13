"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateTaskListDto } from "@/models/task-list"

export async function createTaskListAction(data: CreateTaskListDto, userId: string) {
  return prismaClient.taskList.create({
    data: {
      title: data.title,
      userId
    }
  })
}