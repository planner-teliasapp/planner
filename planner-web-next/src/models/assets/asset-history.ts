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

  static calculateMonthGains(assetHistories: AssetHistory[] | undefined): MonthGains {
    if (!assetHistories || assetHistories.length < 2) {
      return {
        generalTotalGain: 0,
        generalTotalPercentage: 0,
        variableIncomeGain: 0,
        variableIncomePercentage: 0,
        cashBoxGain: 0,
        cashBoxPercentage: 0,
        fixedIncomeGain: 0,
        fixedIncomePercentage: 0,
        pensionGain: 0,
        pensionPercentage: 0,
      }
    }

    const currentHistory = assetHistories[assetHistories.length - 1]
    const previousHistory = assetHistories[assetHistories.length - 2]

    const currentVariableIncome = this.calculateVariableIncomeAmount(currentHistory)
    const previousVariableIncome = this.calculateVariableIncomeAmount(previousHistory)

    return {
      generalTotalGain: currentHistory.generalTotalValue - previousHistory.generalTotalValue,
      generalTotalPercentage: this.calculateGainPercentage(currentHistory.generalTotalValue, previousHistory.generalTotalValue),
      variableIncomeGain: currentVariableIncome - previousVariableIncome,
      variableIncomePercentage: this.calculateGainPercentage(currentVariableIncome, previousVariableIncome),
      cashBoxGain: currentHistory.cashBoxesTotalValue - previousHistory.cashBoxesTotalValue,
      cashBoxPercentage: this.calculateGainPercentage(currentHistory.cashBoxesTotalValue, previousHistory.cashBoxesTotalValue),
      fixedIncomeGain: currentHistory.fixedIncomesTotalValue - previousHistory.fixedIncomesTotalValue,
      fixedIncomePercentage: this.calculateGainPercentage(currentHistory.fixedIncomesTotalValue, previousHistory.fixedIncomesTotalValue),
      pensionGain: currentHistory.pensionsTotalValue - previousHistory.pensionsTotalValue,
      pensionPercentage: this.calculateGainPercentage(currentHistory.pensionsTotalValue, previousHistory.pensionsTotalValue),
    }
  }

  private static calculateGainPercentage(currentValue: number, previousValue: number): number {
    return ((currentValue - previousValue) / previousValue) * 100
  }

  private static calculateVariableIncomeAmount(data: AssetHistory): number {
    return data.stocksTotalValue + data.reitsTotalValue + data.etfsTotalValue + data.internationalsTotalValue + data.cryptosTotalValue + data.goldsTotalValue
  }
}


interface MonthGains {
  generalTotalGain: number
  generalTotalPercentage: number
  variableIncomeGain: number
  variableIncomePercentage: number
  cashBoxGain: number
  cashBoxPercentage: number
  fixedIncomeGain: number
  fixedIncomePercentage: number
  pensionGain: number
  pensionPercentage: number
}