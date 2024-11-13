"use server"

import { prismaClient } from "@/lib/prisma-client"

export async function deleteTaskListAction(id: string): Promise<void> {
  await prismaClient.taskList.delete({
    where: {
      id
    }
  })

  return
}