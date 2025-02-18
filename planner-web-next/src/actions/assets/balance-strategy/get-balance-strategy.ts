"use server"

import { prismaClient } from "@/lib/prisma-client"
import { AssetBalanceStrategy } from "@/models/assets/asset-balance-strategy"

export async function getBalanceStrategyAction(userId: string): Promise<string> {
  const strategy = await prismaClient.assetBalanceStrategy.findFirst({
    where: {
      userId
    }
  })

  if (!strategy) {
    const newStrategy = await prismaClient.assetBalanceStrategy.create({
      data: {
        userId,
        cashBox: 0,
        fixedIncome: 0,
        variableIncome: 0,
        pension: 0,
        property: 0,
        share: 0,
        reit: 0,
        international: 0,
        gold: 0,
        crypto: 0
      }
    })

    return JSON.stringify(AssetBalanceStrategy.fromPrisma(newStrategy))
  }

  return JSON.stringify(AssetBalanceStrategy.fromPrisma(strategy))
}

export async function updateBalanceStrategyAction(data: Partial<AssetBalanceStrategy>, userId: string): Promise<void> {
  const variableIncome = (data.share || 0) + (data.reit || 0) + (data.international || 0) + (data.gold || 0) + (data.crypto || 0)

  await prismaClient.assetBalanceStrategy.update({
    where: {
      userId
    },
    data: {
      ...data,
      variableIncome
    }
  })

  return
}
