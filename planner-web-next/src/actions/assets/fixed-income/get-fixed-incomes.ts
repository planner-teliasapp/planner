"use server"

import { prismaClient } from "@/lib/prisma-client"
import { FixedIncome } from "@/models/assets/fixed-income"

export async function getFixedIncomesAction(userId: string): Promise<string> {
  const fixedIncomes = await prismaClient.fixedIncome.findMany({
    where: {
      userId
    },
    orderBy: {
      date: "asc"
    }
  })

  return JSON.stringify(fixedIncomes.map((fixedIncome) => FixedIncome.fromPrisma(fixedIncome)))
}