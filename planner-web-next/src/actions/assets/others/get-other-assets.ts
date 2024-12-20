"use server"

import { prismaClient } from "@/lib/prisma-client"
import { OtherAsset } from "@/models/assets/other-asset"

export async function getOtherAssetsAction(userId: string): Promise<string> {
  const assets = await prismaClient.otherAsset.findMany({
    where: {
      userId
    },
    orderBy: {
      description: "asc"
    }
  })

  return JSON.stringify(assets.map((data) => OtherAsset.fromPrisma(data)))
}