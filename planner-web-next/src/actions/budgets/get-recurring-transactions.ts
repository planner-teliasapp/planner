"use server"

import { prismaClient } from "@/lib/prisma-client"
import { RecurringTransaction, Transaction } from "@/models/transaction"

export async function getRecurringTransactionsAction(userId: string, year?: number, month?: number): Promise<string> {
  const transactions = await prismaClient.recurringTransaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      description: "asc"
    }
  })

  return JSON.stringify(transactions.map((item) => RecurringTransaction.fromPrisma(item)))
}