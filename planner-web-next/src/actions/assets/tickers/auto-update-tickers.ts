"use server"

import { prismaClient } from "@/lib/prisma-client"
import { getUpdatedTicker } from "@/lib/tickers-api"
import { Ticker } from "@/models/assets/ticker"

export async function autoUpdateTickersAction(): Promise<string> {
  const tickers = await prismaClient.ticker.findMany({
    where: {
      autoUpdate: true
    },
    orderBy: {
      symbol: "asc"
    }
  })

  const updatedTickers = await Promise.all(tickers.map(async (ticker) => {
    const updatedTicker = await getUpdatedTicker(Ticker.fromPrisma(ticker))

    if (updatedTicker) {
      await prismaClient.ticker.update({
        where: {
          id: ticker.id
        },
        data: {
          price: updatedTicker.price,
          change: updatedTicker.change,
          changePercent: updatedTicker.changePercent
        }
      })

      return updatedTicker
    }

    return
  }))

  return JSON.stringify(updatedTickers)
} 