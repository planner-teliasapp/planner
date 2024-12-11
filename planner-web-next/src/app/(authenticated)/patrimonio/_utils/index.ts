import { TickerType } from "@prisma/client"

type TicketTypeMapper = {
  label: string
}

export const tickerTypeMapper: Record<TickerType, TicketTypeMapper> = {
  [TickerType.STOCK]: {
    label: "Ação"
  },
  [TickerType.CRYPTO]: {
    label: "Criptomoeda"
  },
  [TickerType.ETF]: {
    label: "ETF"
  },
  [TickerType.GOLD]: {
    label: "Ouro"
  },
  [TickerType.INTERNATIONAL]: {
    label: "Internacional"
  },
  [TickerType.REIT]: {
    label: "FII"
  },
}