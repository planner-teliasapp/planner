import { Prisma } from "@prisma/client"

export interface IAssetBalanceStrategy {
  id: string
  userId: string
  notes?: string
  cashBox: number
  fixedIncome: number
  variableIncome: number
  pension: number
  property: number
  share: number
  reit: number
  international: number
  gold: number
  crypto: number
}

export class AssetBalanceStrategy implements IAssetBalanceStrategy {
  constructor(data: IAssetBalanceStrategy) {
    Object.assign(this, data)
  }

  public readonly id: string
  public userId: string
  public notes?: string
  public cashBox: number
  public fixedIncome: number
  public variableIncome: number
  public pension: number
  public property: number
  public share: number
  public reit: number
  public international: number
  public gold: number
  public crypto: number

  static fromPrisma(data: Prisma.AssetBalanceStrategyGetPayload<{}>): AssetBalanceStrategy {
    return new AssetBalanceStrategy({
      id: data.id,
      userId: data.userId,
      notes: data.notes || undefined,
      cashBox: Number(data.cashBox),
      fixedIncome: Number(data.fixedIncome),
      variableIncome: Number(data.variableIncome),
      pension: Number(data.pension),
      property: Number(data.property),
      share: Number(data.share),
      reit: Number(data.reit),
      international: Number(data.international),
      gold: Number(data.gold),
      crypto: Number(data.crypto),
    })
  }

  static fromString(data: string): AssetBalanceStrategy {
    return new AssetBalanceStrategy(JSON.parse(data))
  }

  calculateClassesTotalValue(): number {
    return this.cashBox + this.fixedIncome + this.variableIncome + this.pension + this.property
  }

  calculateVariableTotalValue(): number {
    return this.share + this.reit + this.international + this.gold + this.crypto
  }
}