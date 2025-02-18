import { Prisma, TickerType } from "@prisma/client"

export interface ITicker {
  id: string
  symbol: string
  name: string
  agency?: string
  note?: string
  type: TickerType
  price: number
  change: number
  changePercent: number
  autoUpdate: boolean
  updatedAt: Date
}

export class Ticker implements ITicker {
  public readonly id: string
  public symbol: string
  public name: string
  public agency?: string
  public note?: string
  public type: TickerType
  public price: number
  public change: number
  public changePercent: number
  public autoUpdate: boolean
  public readonly updatedAt: Date

  constructor(data: ITicker) {
    Object.assign(this, data)
  }

  static fromPrisma(data: Prisma.TickerGetPayload<{}>): Ticker {
    return new Ticker({
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      type: data.type,
      agency: data.agency || undefined,
      note: data.note || undefined,
      price: Number(data.price),
      change: Number(data.change),
      changePercent: Number(data.changePercent),
      autoUpdate: !!data.autoUpdate,
      updatedAt: data.updatedAt,
    })
  }

  static fromString(data: string): Ticker {
    return new Ticker(JSON.parse(data))
  }

  static fromStringArray(data: string): Ticker[] {
    return JSON.parse(data).map((item: ITicker) => new Ticker(item))
  }
}

export interface CreateTickerDto {
  symbol: string
  name: string
  type: TickerType
  price: number
  autoUpdate?: boolean
}