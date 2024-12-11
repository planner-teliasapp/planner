"use server"

import { prismaClient } from "@/lib/prisma-client"
import { TickerOrder } from "@/models/assets/ticker-order"

export async function getTickerOrdersAction(userId: string): Promise<string> {
  const orders = await prismaClient.tickerOrder.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      Ticker: {
        select: {
          symbol: true,
          name: true,
          type: true
        }
      }
    }
  })

  return JSON.stringify(orders.map((order) => TickerOrder.fromPrisma(order)))
}