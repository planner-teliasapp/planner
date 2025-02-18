import { OthersAssetsTypes, Prisma } from "@prisma/client"

export interface IOtherAsset {
  id: string
  description: string
  value: number
  type: OthersAssetsTypes
  agency?: string
  note?: string
  createdAt: Date
  updatedAt: Date
}

export interface IOtherAssets {
  items: IOtherAsset[]
  currentAmount: number
}

export class OtherAsset implements IOtherAsset {
  id: string
  description: string
  value: number
  type: OthersAssetsTypes
  agency?: string
  note?: string
  createdAt: Date
  updatedAt: Date

  constructor(data: IOtherAsset) {
    Object.assign(this, data)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  static fromPrisma(data: Prisma.OtherAssetGetPayload<{}>): OtherAsset {
    return new OtherAsset({
      id: data.id,
      description: data.description,
      value: Number(data.value),
      type: data.type,
      agency: data.agency || undefined,
      note: data.note || undefined,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    })
  }

  static fromString(data: string): OtherAsset {
    return new OtherAsset(JSON.parse(data))
  }

  static fromStringArray(data: string): OtherAsset[] {
    return JSON.parse(data).map((item: IOtherAsset) => new OtherAsset(item))
  }
}

export class OtherAssets implements IOtherAssets {
  items: OtherAsset[]
  currentAmount: number

  constructor(items: OtherAsset[]) {
    this.items = items
    this.currentAmount = this.items.reduce((acc, item) => {
      return acc + item.value
    }, 0)
  }
}

export interface ICreateOtherAssetDto {
  description: string
  value: number
  type: OthersAssetsTypes
}