"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateRecurringTransactionDto, RecurringTransaction, UpdateRecurringTransactionDto } from "@/models/transaction"

export async function updateRecurringTransactionsAction({ id, ...rest }: UpdateRecurringTransactionDto): Promise<string> {
  const transaction = await prismaClient.recurringTransaction.update({
    where: { id },
    data: { ...rest }
  })

  return JSON.stringify(RecurringTransaction.fromPrisma(transaction))
}