import { TickerType } from "@prisma/client"
import { Stock, Ticker, TickerOrderWithMeanPrice } from "."

export interface IVariableIncomeSummary {
  totalAmount: number
  totalInStocks: number
  totalInEtfs: number
  totalInReits: number
  totalInGolds: number
  totalInCryptos: number
  totalInInternationalStocks: number
  // percentageInStocks: number
  // percentageInEtfs: number
  // percentageInReits: number
  // percentageInGolds: number
  // percentageInCryptos: number
  // percentageInInternationalStocks: number
}

export interface IVariableIncome {
  stocks: Stock[]
  etfs: Stock[]
  reits: Stock[]
  golds: Stock[]
  cryptos: Stock[]
  internationalStocks: Stock[]
  summary: IVariableIncomeSummary
}

export class VariableIncome implements IVariableIncome {
  stocks: Stock[]
  etfs: Stock[]
  reits: Stock[]
  golds: Stock[]
  cryptos: Stock[]
  internationalStocks: Stock[]
  summary: IVariableIncomeSummary

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

    //Get summary
    this.summary = {
      totalInStocks: this.getTotalAmountFromStocks(this.stocks),
      totalInEtfs: this.getTotalAmountFromStocks(this.etfs),
      totalInReits: this.getTotalAmountFromStocks(this.reits),
      totalInGolds: this.getTotalAmountFromStocks(this.golds),
      totalInCryptos: this.getTotalAmountFromStocks(this.cryptos),
      totalInInternationalStocks: this.getTotalAmountFromStocks(this.internationalStocks),
      totalAmount: this.getTotalAmount(),
    }
  }

  private getStocksByType(orders: TickerOrderWithMeanPrice[], tickers: Ticker[], type: TickerType): Stock[] {
    return orders
      .filter(order => order.tickerType === type)
      .map(order => new Stock(
        tickers.find(ticker => ticker.symbol === order.ticker)!,
        order
      ))
  }

  private getTotalAmountFromStocks(stocks: Stock[]): number {
    return stocks.reduce((acc, stock) => acc + stock.totalAmount, 0)
  }

  private getTotalAmount(): number {
    return this.stocks.reduce((acc, stock) => acc + stock.totalAmount, 0)
      + this.etfs.reduce((acc, etf) => acc + etf.totalAmount, 0)
      + this.reits.reduce((acc, reit) => acc + reit.totalAmount, 0)
      + this.golds.reduce((acc, gold) => acc + gold.totalAmount, 0)
      + this.cryptos.reduce((acc, crypto) => acc + crypto.totalAmount, 0)
      + this.internationalStocks.reduce((acc, internationalStock) => acc + internationalStock.totalAmount, 0)
  }
}