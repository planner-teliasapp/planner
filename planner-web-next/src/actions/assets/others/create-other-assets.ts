"use server"

import { prismaClient } from "@/lib/prisma-client"
import { ICreateOtherAssetDto, OtherAsset } from "@/models/assets/other-asset"

export async function createOtherAssetsAction(data: ICreateOtherAssetDto, userId: string): Promise<string> {
  const asset = await prismaClient.otherAsset.create({
    data: {
      userId,
      description: data.description,
      value: data.value,
      type: data.type,
    }
  })

  return JSON.stringify(OtherAsset.fromPrisma(asset))
}