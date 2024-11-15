"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Transaction } from "@/models/transaction"

export async function getTransactionsAction(userId: string): Promise<string> {
  const transactions = await prismaClient.transaction.findMany({
    where: {
      userId
    },
    orderBy: {
      date: "desc"
    }
  })

  return JSON.stringify(transactions.map((item) => Transaction.fromPrisma(item)))
}