"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateTickerOrderDto, TickerOrder } from "@/models/assets/ticker-order"

export async function createTickerOrderAction(data: CreateTickerOrderDto, userId: string): Promise<string> {
  const ticker = await prismaClient.tickerOrder.create({
    data: {
      userId,
      ticker: data.ticker,
      type: data.type,
      quantity: data.quantity,
      price: data.price,
      createdAt: data.date
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

  return JSON.stringify(TickerOrder.fromPrisma(ticker))
}