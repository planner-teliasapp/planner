"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Transaction, UpdateTransactionDto } from "@/models/transaction"

export async function updateTransactionsAction({ id, ...rest }: UpdateTransactionDto): Promise<string> {
  const transaction = await prismaClient.transaction.update({
    where: { id },
    data: { ...rest }
  })

  return JSON.stringify(Transaction.fromPrisma(transaction))
}