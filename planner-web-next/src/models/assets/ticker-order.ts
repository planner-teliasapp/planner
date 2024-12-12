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

  static orderOrdersByDate(orders: TickerOrder[], asc: boolean = false): TickerOrder[] {
    return orders.sort((a, b) => asc ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime())
  }

  static includeMeanPrice(orders: TickerOrder[]): TickerOrderWithMeanPrice[] {
    const orderedOrders = TickerOrder.orderOrdersByDate(orders, true)
    const ordersWithMeanPrice: TickerOrderWithMeanPrice[] = []

    let prevData: { [key: string]: { previousMeanPrice: number, previousTotalQuantity: number } }[] = []

    for (const order of orderedOrders) {
      let prevDataIndex = prevData.findIndex(data => data[order.ticker])

      const previousMeanPrice = prevData[prevDataIndex]?.[order.ticker]?.previousMeanPrice || 0
      const previousTotalQuantity = prevData[prevDataIndex]?.[order.ticker]?.previousTotalQuantity || 0

      const newTotalQuantity = previousTotalQuantity + (order.quantity * (order.orderType === TickerOrderType.BUY ? 1 : -1))

      const newMeanPrice = order.orderType === TickerOrderType.BUY ? ((previousMeanPrice * previousTotalQuantity) + (order.price * order.quantity)) / newTotalQuantity : previousMeanPrice

      const gain = order.orderType === TickerOrderType.SELL ? (order.price - previousMeanPrice) * order.quantity : undefined

      ordersWithMeanPrice.push({
        ...order,
        previousMeanPrice,
        previousTotalQuantity,
        newMeanPrice,
        newTotalQuantity,
        gain
      })
      if (prevDataIndex === -1) {
        prevData.push({
          [order.ticker]: {
            previousMeanPrice: newMeanPrice,
            previousTotalQuantity: newTotalQuantity
          }
        })
      } else {
        prevData[prevDataIndex] = {
          ...prevData[prevDataIndex],
          [order.ticker]: {
            previousMeanPrice: newMeanPrice,
            previousTotalQuantity: newTotalQuantity
          }
        }
      }
    }
    return ordersWithMeanPrice
  }
}

export type TickerOrderWithMeanPrice = TickerOrder & {
  previousMeanPrice: number
  previousTotalQuantity: number
  newMeanPrice: number
  newTotalQuantity: number
  gain?: number
}

export interface CreateTickerOrderDto {
  ticker: string
  type: TickerOrderType
  quantity: number
  price: number
  date?: Date
}