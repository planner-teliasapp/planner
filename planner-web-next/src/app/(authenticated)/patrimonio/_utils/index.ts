import { PosFixedIndexType, TickerOrderType, TickerType } from "@prisma/client"

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

type TickerOrderTypeMapper = {
  label: string
}

export const tickerOrderTypeMapper: Record<TickerOrderType, TickerOrderTypeMapper> = {
  [TickerOrderType.BUY]: {
    label: "Compra"
  },
  [TickerOrderType.SELL]: {
    label: "Venda"
  }
}

type PosFixedIndexTypeMapper = {
  label: string
}

export const fixedIncomeIndexTypeMapper: Record<PosFixedIndexType, PosFixedIndexTypeMapper> = {
  [PosFixedIndexType.CDI]: {
    label: "CDI"
  },
  [PosFixedIndexType.IPCA]: {
    label: "IPCA"
  },
  [PosFixedIndexType.SELIC]: {
    label: "SELIC"
  },
  [PosFixedIndexType.IGPM]: {
    label: "IGPM"
  },
  [PosFixedIndexType.INPC]: {
    label: "INPC"
  },
  [PosFixedIndexType.NONE]: {
    label: "Nenhum"
  }
}