import { VariableIncome } from "."

export interface IAssets {
  variableIncome: VariableIncome
}

export class Assets implements IAssets {
  variableIncome: VariableIncome

  constructor(data: IAssets) {
    Object.assign(this, data)
  }
}