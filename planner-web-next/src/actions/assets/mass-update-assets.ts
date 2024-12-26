"use server"

import { prismaClient } from "@/lib/prisma-client"
import { MassUpdatable } from "@/models/assets/mass-update"

export async function massUpdateAssetsAction(data: MassUpdatable[]): Promise<void> {

  for (const item of data) {
    switch (item.type) {
      case "FIXED_INCOME":
        await prismaClient.fixedIncome.update({
          where: {
            id: item.id
          },
          data: {
            currentValue: item.value
          }
        })
        break
      default:
        await prismaClient.otherAsset.update({
          where: {
            id: item.id
          },
          data: {
            value: item.value
          }
        })
    }
  }

  return
}