import { OthersAssetsTypes } from "@prisma/client"

export interface MassUpdatable {
  id: string
  description: string
  type: OthersAssetsTypes | "FIXED_INCOME"
  value: number
}