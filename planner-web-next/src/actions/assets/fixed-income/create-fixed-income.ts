"use server"

import { prismaClient } from "@/lib/prisma-client"
import { FixedIncome, ICreateFixedIncomeDto } from "@/models/assets/fixed-income"

export async function createFixedIncomeAction(data: ICreateFixedIncomeDto, userId: string): Promise<string> {
  const fixedIncome = await prismaClient.fixedIncome.create({
    data: {
      userId,
      description: data.description,
      initialInvestment: data.initialInvestment,
      currentValue: data.currentValue || data.initialInvestment,
      date: data.date,
      dueDate: data.dueDate,
      fixedRate: data.fixedRate,
      posFixedIndex: data.posFixedIndex,
    }
  })

  return JSON.stringify(FixedIncome.fromPrisma(fixedIncome))
}