"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Task } from "@/models/task"

export async function getTasksAction(userId: string): Promise<string> {
  const tasks = await prismaClient.task.findMany({
    where: {
      userId
    },
    include: {
      TaskList: {
        select: {
          title: true,
          id: true
        }
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return JSON.stringify(tasks.map((task) => Task.fromPrisma(task)))
}