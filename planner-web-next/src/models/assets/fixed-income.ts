import { PosFixedIndexType, Prisma } from "@prisma/client"

export interface IFixedIncome {
  id: string
  description: string
  initialInvestment: number
  currentValue: number
  date: Date
  dueDate?: Date
  fixedRate: number
  posFixedIndex: PosFixedIndexType
  updatedAt: Date
}

export interface IFixedIncomes {
  data: FixedIncome[]
  currentAmount: number
}

export class FixedIncome implements IFixedIncome {
  id: string
  description: string
  initialInvestment: number
  currentValue: number
  date: Date
  dueDate?: Date
  fixedRate: number
  posFixedIndex: PosFixedIndexType
  updatedAt: Date

  constructor(data: IFixedIncome) {
    Object.assign(this, data)
  }

  static fromPrisma(data: Prisma.FixedIncomeGetPayload<{}>): FixedIncome {
    return new FixedIncome({
      id: data.id,
      description: data.description,
      initialInvestment: Number(data.initialInvestment),
      currentValue: Number(data.currentValue),
      date: new Date(data.date),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      fixedRate: Number(data.fixedRate),
      posFixedIndex: data.posFixedIndex,
      updatedAt: new Date(data.updatedAt),
    })
  }

  static fromStringArray(data: string): FixedIncome[] {
    return JSON.parse(data).map((item: IFixedIncome) => new FixedIncome(item))
  }
}

export class FixedIncomes implements IFixedIncomes {
  data: FixedIncome[]
  currentAmount: number

  constructor(data: FixedIncome[]) {
    this.data = data
    this.currentAmount = data.reduce((acc, item) => acc + item.currentValue, 0)
  }
}