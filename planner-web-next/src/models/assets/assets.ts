import { OtherAssets, VariableIncome } from "."
import { FixedIncomes } from "./fixed-income"

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

  constructor(data: IAssets) {
    Object.assign(this, data)
  }
}