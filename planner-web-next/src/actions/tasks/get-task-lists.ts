"use server"

import { prismaClient } from "@/lib/prisma-client"
import { TaskList } from "@/models/task-list"

export async function getTaskListsAction(userId: string): Promise<string> {
  const lists = await prismaClient.taskList.findMany({
    where: {
      userId
    },
    include: {
      Tasks: {
        include: {
          TaskList: {
            select: {
              title: true,
              id: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return JSON.stringify(lists.map((list) => TaskList.fromPrisma(list)))
}