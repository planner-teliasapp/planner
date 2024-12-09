"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Ticker } from "@/models/assets/ticker"

export async function getTickersAction(): Promise<string> {
  const tickers = await prismaClient.ticker.findMany({
    orderBy: {
      symbol: "asc"
    }
  })

  return JSON.stringify(tickers.map((ticker) => Ticker.fromPrisma(ticker)))
}