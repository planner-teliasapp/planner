"use server"

import { prismaClient } from "@/lib/prisma-client"

export async function deleteTaskAction(id: string): Promise<void> {
  await prismaClient.task.delete({
    where: {
      id
    }
  })

  return
}