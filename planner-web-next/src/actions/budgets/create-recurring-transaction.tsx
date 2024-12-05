"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateRecurringTransactionDto, RecurringTransaction } from "@/models/transaction"

export async function createRecurringTransactionsAction(data: CreateRecurringTransactionDto, userId: string): Promise<string> {
  const transaction = await prismaClient.recurringTransaction.create({
    data: {
      ...data,
      userId
    }
  })

  return JSON.stringify(RecurringTransaction.fromPrisma(transaction))
}