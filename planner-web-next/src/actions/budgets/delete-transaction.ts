"use server"

import { prismaClient } from "@/lib/prisma-client"

export async function deleteTransactionAction(id: string): Promise<void> {
  await prismaClient.transaction.delete({
    where: {
      id
    }
  })

  return
}