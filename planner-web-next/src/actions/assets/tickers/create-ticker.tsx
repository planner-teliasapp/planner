"use server"

import { TickerAlreadyExists } from "@/errors"
import { prismaClient } from "@/lib/prisma-client"
import { CreateTickerDto, Ticker } from "@/models/assets/ticker"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export async function createTickerAction(data: CreateTickerDto): Promise<string> {
  try {
    const ticker = await prismaClient.ticker.create({
      data: {
        ...data,
        symbol: data.symbol.toUpperCase()
      }
    })

    return JSON.stringify(Ticker.fromPrisma(ticker))

  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new TickerAlreadyExists()
    }

    throw error
  }
}