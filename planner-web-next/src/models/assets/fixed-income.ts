import { PosFixedIndexType, Prisma } from "@prisma/client"
import { differenceInDays } from "date-fns"

export interface IFixedIncome {
  id: string
  description: string
  agency?: string
  note?: string
  initialInvestment: number
  currentValue: number
  date: Date
  dueDate?: Date
  fixedRate: number
  posFixedIndex: PosFixedIndexType
  updatedAt: Date
}

export interface IFixedIncomes {
  items: FixedIncome[]
  currentAmount: number
}

export class FixedIncome implements IFixedIncome {
  id: string
  description: string
  agency?: string
  note?: string
  initialInvestment: number
  currentValue: number
  profit: number
  profitPercentage: number
  date: Date
  dueDate?: Date
  pastDays: number
  remainingDays?: number
  fixedRate: number
  posFixedIndex: PosFixedIndexType
  taxRate: number
  currentValueAfterTax: number
  updatedAt: Date

  constructor(data: IFixedIncome) {
    Object.assign(this, data)

    this.profit = this.currentValue - this.initialInvestment
    this.profitPercentage = (this.profit / this.initialInvestment) * 100
    this.taxRate = this.getTaxRateValue(this.pastDays)
    this.currentValueAfterTax = this.initialInvestment + (this.profit * (1 - this.taxRate / 100))

    if (this.dueDate) {
      const remainingDays = differenceInDays(this.dueDate, new Date())
      if (remainingDays < 0) {
        this.remainingDays = 0
        this.pastDays = differenceInDays(this.dueDate, this.date)
      } else {
        this.remainingDays = remainingDays
        this.pastDays = differenceInDays(new Date(), this.date)
      }
    }
  }

  static fromPrisma(data: Prisma.FixedIncomeGetPayload<{}>): FixedIncome {
    return new FixedIncome({
      id: data.id,
      description: data.description,
      agency: data.agency || undefined,
      note: data.note || undefined,
      initialInvestment: Number(data.initialInvestment),
      currentValue: Number(data.currentValue),
      date: new Date(data.date),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      fixedRate: Number(data.fixedRate),
      posFixedIndex: data.posFixedIndex,
      updatedAt: new Date(data.updatedAt),
    })
  }

  static fromString(data: string): FixedIncome {
    return new FixedIncome(JSON.parse(data))
  }

  static fromStringArray(data: string): FixedIncome[] {
    return JSON.parse(data).map((item: IFixedIncome) => new FixedIncome(item))
  }

  private getTaxRateValue(days: number): number {
    if (days <= 180) return 22.5
    if (days <= 360) return 20
    if (days <= 720) return 17.5
    return 15
  }
}

export class FixedIncomes implements IFixedIncomes {
  items: FixedIncome[]
  currentAmount: number

  constructor(data: FixedIncome[]) {
    this.items = data
    this.currentAmount = data.reduce((acc, item) => (item.remainingDays ?? 0) > 0 ? acc + item.currentValue : acc, 0)
  }
}

export interface ICreateFixedIncomeDto {
  description: string
  initialInvestment: number
  currentValue?: number
  date: Date
  dueDate?: Date
  fixedRate?: number
  posFixedIndex: PosFixedIndexType
}