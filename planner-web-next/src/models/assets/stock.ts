import { Ticker, TickerOrder, TickerOrderWithMeanPrice } from "."

export interface IStock {
  tickerId: string
  symbol: string
  name: string
  quantity: number
  meanPrice: number
  price: number
  change: number
  changePercent: number
  updatedAt: Date
}

export class Stock implements IStock {
  tickerId: string
  symbol: string
  name: string
  quantity: number
  meanPrice: number
  price: number
  change: number
  changePercent: number
  updatedAt: Date

  constructor(ticker: Ticker, lastTickerOrder: TickerOrderWithMeanPrice) {
    this.tickerId = ticker.id
    this.symbol = ticker.symbol
    this.name = ticker.name
    this.quantity = lastTickerOrder.newTotalQuantity
    this.meanPrice = lastTickerOrder.newMeanPrice
    this.price = ticker.price
    this.change = ticker.change
    this.changePercent = ticker.changePercent
    this.updatedAt = ticker.updatedAt
  }
}