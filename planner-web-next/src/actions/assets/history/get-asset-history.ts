"use server"

import { prismaClient } from "@/lib/prisma-client"
import { AssetHistory } from "@/models/assets/asset-history"

export async function getAssetHistoryAction(userId: string): Promise<string> {
  const history = await prismaClient.assetHistory.findMany({
    where: {
      userId
    },
    orderBy: {
      date: "asc"
    }
  })

  return JSON.stringify(history.map((fixedIncome) => AssetHistory.fromPrisma(fixedIncome)))
}