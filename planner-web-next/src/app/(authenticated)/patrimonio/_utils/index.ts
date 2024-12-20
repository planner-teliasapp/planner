import { OthersAssetsTypes, PosFixedIndexType, TickerOrderType, TickerType } from "@prisma/client"

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

type OtherAssetsTypeMapper = {
  label: string
  labelPlural: string
  slug: string
  assetsKey: string
  type: OthersAssetsTypes
}

export const otherAssetsTypeMapper: Record<OthersAssetsTypes, OtherAssetsTypeMapper> = {
  [OthersAssetsTypes.CASH_BOX]: {
    label: "Caixa",
    labelPlural: "Caixas",
    slug: "caixa",
    assetsKey: "cashBox",
    type: OthersAssetsTypes.CASH_BOX
  },
  [OthersAssetsTypes.FINANCIAL_INJECTION]: {
    label: "Aporte",
    labelPlural: "Aportes",
    slug: "aporte",
    assetsKey: "financialInjection",
    type: OthersAssetsTypes.FINANCIAL_INJECTION
  },
  [OthersAssetsTypes.PENSION]: {
    label: "Previdência",
    labelPlural: "Previdências",
    slug: "previdencia",
    assetsKey: "pension",
    type: OthersAssetsTypes.PENSION
  },
  [OthersAssetsTypes.PROPERTY]: {
    label: "Propriedade",
    labelPlural: "Propriedades",
    slug: "propriedade",
    assetsKey: "property",
    type: OthersAssetsTypes.PROPERTY
  },
  [OthersAssetsTypes.SHARE]: {
    label: "Compartilhar",
    labelPlural: "Compartilhar",
    slug: "compartilhar",
    assetsKey: "share",
    type: OthersAssetsTypes.SHARE
  }
}

export function getOtherAssetsDataBySlug(slug: string) {
  return Object.values(otherAssetsTypeMapper).find((type) => type.slug === slug)
}