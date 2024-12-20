import { OtherAssets, VariableIncome } from "."
import { FixedIncomes } from "./fixed-income"

export interface IAssetsSummary {
  totalAmount: number

  variableIncomeAmount: number
  variableIncomePercentage: number

  variableIncomeSummary: {
    totalAmount: number

    stocksAmount: number
    stocksPercentage: number
    stocksGlobalPercentage: number

    etfsAmount: number
    etfsPercentage: number
    etfsGlobalPercentage: number

    reitsAmount: number
    reitsPercentage: number
    reitsGlobalPercentage: number

    goldsAmount: number
    goldsPercentage: number
    goldsGlobalPercentage: number

    cryptosAmount: number
    cryptosPercentage: number
    cryptosGlobalPercentage: number

    internationalStocksAmount: number
    internationalStocksPercentage: number
    internationalStocksGlobalPercentage: number
  }

  fixedIncomeAmount: number
  fixedIncomePercentage: number

  cashBoxAmount: number
  cashBoxPercentage: number

  pensionAmount: number
  pensionPercentage: number

  propertyAmount: number
  propertyPercentage: number

  shareAmount: number
  sharePercentage: number

  financialInjectionAmount: number
  financialInjectionPercentage: number
}

export interface IAssets {
  variableIncome: VariableIncome
  fixedIncome: FixedIncomes
  cashBox: OtherAssets
  pension: OtherAssets
  property: OtherAssets
  share: OtherAssets
  financialInjection: OtherAssets
}

export class Assets implements IAssets {
  variableIncome: VariableIncome
  fixedIncome: FixedIncomes
  cashBox: OtherAssets
  pension: OtherAssets
  property: OtherAssets
  share: OtherAssets
  financialInjection: OtherAssets
  summary: IAssetsSummary

  constructor(data: IAssets) {
    Object.assign(this, data)

    const totalAmount = this.calculateTotalAmount()

    const variableIncomeAmount = this.variableIncome.summary.totalAmount
    const stocksAmount = this.variableIncome.summary.totalInStocks
    const etfsAmount = this.variableIncome.summary.totalInEtfs
    const reitsAmount = this.variableIncome.summary.totalInReits
    const goldsAmount = this.variableIncome.summary.totalInGolds
    const cryptosAmount = this.variableIncome.summary.totalInCryptos
    const internationalStocksAmount = this.variableIncome.summary.totalInInternationalStocks

    const fixedIncomeAmount = this.fixedIncome.currentAmount
    const cashBoxAmount = this.cashBox.currentAmount
    const pensionAmount = this.pension.currentAmount
    const propertyAmount = this.property.currentAmount
    const shareAmount = this.share.currentAmount
    const financialInjectionAmount = this.financialInjection.currentAmount

    const summary: IAssetsSummary = {
      totalAmount,
      variableIncomeAmount,
      variableIncomePercentage: this.calculatePercentage(totalAmount, variableIncomeAmount),
      variableIncomeSummary: {
        totalAmount: variableIncomeAmount,
        stocksAmount,
        stocksPercentage: this.calculatePercentage(variableIncomeAmount, stocksAmount),
        stocksGlobalPercentage: this.calculatePercentage(totalAmount, stocksAmount),
        etfsAmount,
        etfsPercentage: this.calculatePercentage(variableIncomeAmount, etfsAmount),
        etfsGlobalPercentage: this.calculatePercentage(totalAmount, etfsAmount),
        reitsAmount,
        reitsPercentage: this.calculatePercentage(variableIncomeAmount, reitsAmount),
        reitsGlobalPercentage: this.calculatePercentage(totalAmount, reitsAmount),
        goldsAmount,
        goldsPercentage: this.calculatePercentage(variableIncomeAmount, goldsAmount),
        goldsGlobalPercentage: this.calculatePercentage(totalAmount, goldsAmount),
        cryptosAmount,
        cryptosPercentage: this.calculatePercentage(variableIncomeAmount, cryptosAmount),
        cryptosGlobalPercentage: this.calculatePercentage(totalAmount, cryptosAmount),
        internationalStocksAmount,
        internationalStocksPercentage: this.calculatePercentage(variableIncomeAmount, internationalStocksAmount),
        internationalStocksGlobalPercentage: this.calculatePercentage(totalAmount, internationalStocksAmount)
      },
      fixedIncomeAmount,
      fixedIncomePercentage: this.calculatePercentage(totalAmount, fixedIncomeAmount),
      cashBoxAmount,
      cashBoxPercentage: this.calculatePercentage(totalAmount, cashBoxAmount),
      pensionAmount,
      pensionPercentage: this.calculatePercentage(totalAmount, pensionAmount),
      propertyAmount,
      propertyPercentage: this.calculatePercentage(totalAmount, propertyAmount),
      shareAmount,
      sharePercentage: this.calculatePercentage(totalAmount, shareAmount),
      financialInjectionAmount,
      financialInjectionPercentage: this.calculatePercentage(totalAmount, financialInjectionAmount)
    }

    this.summary = summary
  }

  // Don`n consider financialInjection
  private calculateTotalAmount(): number {
    const totalAmount =
      this.variableIncome.summary.totalAmount +
      this.fixedIncome.currentAmount +
      this.cashBox.currentAmount +
      this.pension.currentAmount +
      this.property.currentAmount +
      this.share.currentAmount

    return totalAmount
  }

  private calculatePercentage(totalAmount: number, amount: number): number {
    return amount / totalAmount
  }
}