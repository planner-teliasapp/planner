import { TickerType } from "@prisma/client"
import { Stock, Ticker, TickerOrderWithMeanPrice } from "."

export interface IVariableIncome {
  stocks: Stock[]
  etfs: Stock[]
  reits: Stock[]
  golds: Stock[]
  cryptos: Stock[]
  internationalStocks: Stock[]
}

export class VariableIncome implements IVariableIncome {
  stocks: Stock[]
  etfs: Stock[]
  reits: Stock[]
  golds: Stock[]
  cryptos: Stock[]
  internationalStocks: Stock[]

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

    //Get by type
    this.stocks = this.getStocksByType(ordersWithNomZeroQuantity, tickers, TickerType.STOCK)
    this.etfs = this.getStocksByType(ordersWithNomZeroQuantity, tickers, TickerType.ETF)
    this.reits = this.getStocksByType(ordersWithNomZeroQuantity, tickers, TickerType.REIT)
    this.golds = this.getStocksByType(ordersWithNomZeroQuantity, tickers, TickerType.GOLD)
    this.cryptos = this.getStocksByType(ordersWithNomZeroQuantity, tickers, TickerType.CRYPTO)
    this.internationalStocks = this.getStocksByType(ordersWithNomZeroQuantity, tickers, TickerType.INTERNATIONAL)
  }

  private getStocksByType(orders: TickerOrderWithMeanPrice[], tickers: Ticker[], type: TickerType): Stock[] {
    return orders
      .filter(order => order.tickerType === type)
      .map(order => new Stock(
        tickers.find(ticker => ticker.symbol === order.ticker)!,
        order
      ))
  }
}