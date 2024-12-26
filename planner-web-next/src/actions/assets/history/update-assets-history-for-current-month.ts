"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Assets } from "@/models/assets/assets"
import { startOfMonth, endOfMonth } from "date-fns"

export async function updateAssetsHistoryForCurrentMonthAction(data: string, userId: string): Promise<string> {

  const parsedData = JSON.parse(data) as Assets

  const today = new Date()
  const firstMonthDay = startOfMonth(today)
  const lastMonthDay = endOfMonth(today)

  console.log("First month day", firstMonthDay)
  console.log("Last month day", lastMonthDay)
  console.log(data)

  const currentMonthHistory = await prismaClient.assetHistory.findFirst({
    where: {
      userId,
      date: {
        lte: lastMonthDay,
        gte: firstMonthDay
      }
    },
    select: {
      id: true
    }
  })

  const dataToSave = {
    stocksTotalValue: parsedData.variableIncome.summary.totalInStocks,
    reitsTotalValue: parsedData.variableIncome.summary.totalInReits,
    etfsTotalValue: parsedData.variableIncome.summary.totalInEtfs,
    internationalsTotalValue: parsedData.variableIncome.summary.totalInInternationalStocks,
    cryptosTotalValue: parsedData.variableIncome.summary.totalInCryptos,
    goldsTotalValue: parsedData.variableIncome.summary.totalInGolds,
    cashBoxesTotalValue: parsedData.cashBox.currentAmount,
    pensionsTotalValue: parsedData.pension.currentAmount,
    fixedIncomesTotalValue: parsedData.fixedIncome.currentAmount,
    propertiesTotalValue: parsedData.property.currentAmount,
    sharesTotalValue: parsedData.share.currentAmount,
    financialInjectionsValue: parsedData.financialInjection.currentAmount,
    generalTotalValue: parsedData.summary.totalAmount,
    date: today
  }

  await prismaClient.assetHistory.upsert({
    where: {
      id: currentMonthHistory?.id || "new"
    },
    update: dataToSave,
    create: {
      userId,
      ...dataToSave
    }
  })

  return "Assets history updated"
}