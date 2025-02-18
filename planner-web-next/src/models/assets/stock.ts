import { Ticker, TickerOrderWithMeanPrice } from "."

export interface IStock {
  tickerId: string
  symbol: string
  name: string
  agency?: string
  note?: string
  quantity: number
  meanPrice: number
  price: number
  totalAmount: number
  change: number
  changePercent: number
  profit: number
  profitPercent: number
  updatedAt: Date
}

export class Stock implements IStock {
  tickerId: string
  symbol: string
  name: string
  agency?: string
  note?: string
  quantity: number
  meanPrice: number
  price: number
  totalAmount: number
  change: number
  changePercent: number
  profit: number
  profitPercent: number
  updatedAt: Date

  constructor(ticker: Ticker, lastTickerOrder: TickerOrderWithMeanPrice) {
    this.tickerId = ticker.id
    this.symbol = ticker.symbol
    this.name = ticker.name
    this.agency = ticker.agency
    this.note = ticker.note
    this.quantity = lastTickerOrder.newTotalQuantity
    this.meanPrice = lastTickerOrder.newMeanPrice
    this.price = ticker.price
    this.totalAmount = ticker.price * lastTickerOrder.newTotalQuantity
    this.change = ticker.change
    this.changePercent = ticker.changePercent
    this.profit = (ticker.price - lastTickerOrder.newMeanPrice) * lastTickerOrder.newTotalQuantity
    this.profitPercent = (ticker.price - lastTickerOrder.newMeanPrice) / lastTickerOrder.newMeanPrice

    this.updatedAt = ticker.updatedAt
  }
}