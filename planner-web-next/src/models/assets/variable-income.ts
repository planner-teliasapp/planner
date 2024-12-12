import { TickerType } from "@prisma/client"
import { Stock, Ticker, TickerOrderWithMeanPrice } from "."

export interface IVariableIncome {
  stocks: Stock[]
}

export class VariableIncome implements IVariableIncome {
  stocks: Stock[]

  constructor(tickers: Ticker[], orders: TickerOrderWithMeanPrice[]) {
    //Get last order from each ticker
    const lastOrdersFromEachTicker: TickerOrderWithMeanPrice[] = []
    orders.forEach(order => {
      const prevIndex = lastOrdersFromEachTicker.findIndex(lastOrder => lastOrder.ticker === order.ticker)
      if (prevIndex === -1) {
        lastOrdersFromEachTicker.push(order)
      } else {
        lastOrdersFromEachTicker[prevIndex] = order
      }
    })

    //Filter orders with quantity different from 0 and return a Stock object
    const ordersWithNomZeroQuantity = lastOrdersFromEachTicker.filter(order => order.newTotalQuantity !== 0)
    this.stocks = ordersWithNomZeroQuantity
      .filter(order => order.tickerType === TickerType.STOCK)
      .map(order => new Stock(
        tickers.find(ticker => ticker.symbol === order.ticker)!,
        order
      ))
  }
}