import { Prisma, TickerOrderType, TickerType } from "@prisma/client"

export interface ITickerOrder {
  id: string
  ticker: string
  name: string
  tickerType: TickerType
  orderType: TickerOrderType
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
}

export class TickerOrder implements ITickerOrder {
  id: string
  ticker: string
  name: string
  tickerType: TickerType
  orderType: TickerOrderType
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date

  constructor(data: ITickerOrder) {
    Object.assign(this, data)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  static fromPrisma(data: Prisma.TickerOrderGetPayload<{
    include: {
      Ticker: {
        select: {
          symbol: true,
          name: true,
          type: true
        }
      }
    }
  }>): TickerOrder {
    return new TickerOrder({
      id: data.id,
      ticker: data.ticker,
      name: data.Ticker.name,
      tickerType: data.Ticker.type,
      orderType: data.type,
      price: Number(data.price),
      quantity: Number(data.quantity),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  static fromString(data: string): TickerOrder {
    return new TickerOrder(JSON.parse(data))
  }

  static fromStringArray(data: string): TickerOrder[] {
    return JSON.parse(data).map((item: ITickerOrder) => new TickerOrder(item))
  }
}