"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateTransactionDto, Transaction } from "@/models/transaction"

export async function createTransactionsAction(data: CreateTransactionDto, userId: string): Promise<string> {
  const transaction = await prismaClient.transaction.create({
    data: {
      ...data,
      userId
    },
    include: {
      RecurringTransaction: {
        select: {
          description: true
        }
      }
    }
  })

  return JSON.stringify(Transaction.fromPrisma(transaction))
}