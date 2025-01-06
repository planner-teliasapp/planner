import { Prisma } from "@prisma/client"

export interface IAssetHistory {
  id: string
  date: Date
  stocksTotalValue: number
  reitsTotalValue: number
  etfsTotalValue: number
  internationalsTotalValue: number
  cryptosTotalValue: number
  goldsTotalValue: number
  cashBoxesTotalValue: number
  pensionsTotalValue: number
  fixedIncomesTotalValue: number
  propertiesTotalValue: number
  sharesTotalValue: number
  financialInjectionsValue: number
  generalTotalValue: number
}

export class AssetHistory implements IAssetHistory {
  public readonly id: string
  public date: Date
  public stocksTotalValue: number
  public reitsTotalValue: number
  public etfsTotalValue: number
  public internationalsTotalValue: number
  public cryptosTotalValue: number
  public goldsTotalValue: number
  public cashBoxesTotalValue: number
  public pensionsTotalValue: number
  public fixedIncomesTotalValue: number
  public propertiesTotalValue: number
  public sharesTotalValue: number
  public financialInjectionsValue: number
  public generalTotalValue: number

  constructor(data: IAssetHistory) {
    Object.assign(this, data)
  }

  static fromPrisma(data: Prisma.AssetHistoryGetPayload<{}>): AssetHistory {
    return new AssetHistory({
      id: data.id,
      date: data.date,
      stocksTotalValue: Number(data.stocksTotalValue),
      reitsTotalValue: Number(data.reitsTotalValue),
      etfsTotalValue: Number(data.etfsTotalValue),
      internationalsTotalValue: Number(data.internationalsTotalValue),
      cryptosTotalValue: Number(data.cryptosTotalValue),
      goldsTotalValue: Number(data.goldsTotalValue),
      cashBoxesTotalValue: Number(data.cashBoxesTotalValue),
      pensionsTotalValue: Number(data.pensionsTotalValue),
      fixedIncomesTotalValue: Number(data.fixedIncomesTotalValue),
      propertiesTotalValue: Number(data.propertiesTotalValue),
      sharesTotalValue: Number(data.sharesTotalValue),
      financialInjectionsValue: Number(data.financialInjectionsValue),
      generalTotalValue: Number(data.generalTotalValue),
    })
  }

  static fromString(data: string): AssetHistory {
    return new AssetHistory(JSON.parse(data))
  }

  static fromStringArray(data: string): AssetHistory[] {
    return JSON.parse(data).map((item: IAssetHistory) => new AssetHistory(item))
  }
}