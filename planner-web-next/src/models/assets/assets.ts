import { VariableIncome } from "."
import { FixedIncomes } from "./fixed-income"

export interface IAssets {
  variableIncome: VariableIncome
  fixedIncome: FixedIncomes
}

export class Assets implements IAssets {
  variableIncome: VariableIncome
  fixedIncome: FixedIncomes

  constructor(data: IAssets) {
    Object.assign(this, data)
  }
}