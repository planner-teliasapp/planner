"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Transaction } from "@/models/transaction"

export async function getTransactionsAction(userId: string, year?: number, month?: number): Promise<string> {
  const gte = year && month ? new Date(year, month - 1, 1) : new Date("01/01/2000")
  const lt = year && month ? new Date(year, month, 1) : new Date("01/01/2300")

  const transactions = await prismaClient.transaction.findMany({
    where: {
      userId,
      date: {
        gte,
        lt
      }
    },
    orderBy: {
      date: "desc"
    },
    include: {
      RecurringTransaction: {
        select: {
          description: true,
        }
      }
    }
  })

  return JSON.stringify(transactions.map((item) => Transaction.fromPrisma(item)))
}