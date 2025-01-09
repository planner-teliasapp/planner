const { PrismaClient: GuestPrismaClient } = require("@prisma/client")
const { setDate: guestSetDate, add: guestAdd, endOfMonth: guestEndOfMonth, startOfMonth: guestStartOfMonth, sub: guestSub, subDays: guestSubDays, subMonths: guestSubMonths } = require("date-fns")

const guestPrismaClient = new GuestPrismaClient()
const guestUserId = process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID || ""
const guestCurrentDate = new Date()

const guestTasks = [
  {
    title: "Estudar para a certificação",
    userId: guestUserId
  },
  {
    title: "Fazer o desafio de programação",
    userId: guestUserId
  },
  {
    title: "Estudar para a faculdade",
    userId: guestUserId
  },
  {
    title: "Fazer exercícios",
    userId: guestUserId
  },
  {
    title: "Estudar inglês",
    userId: guestUserId
  },
  {
    title: "Fazer teste",
    userId: guestUserId
  },
  {
    title: "Fazer compras",
    userId: guestUserId
  },
  {
    title: "Revisar o conteúdo",
    userId: guestUserId
  }
]

const guestTaskLists = [
  {
    title: "Estudos",
    userId: guestUserId,
  },
  {
    title: "Compras",
    userId: guestUserId,
  },
  {
    title: "Trabalho",
    userId: guestUserId,
  }
]

const guestRecurringTransactions = [
  {
    userId: guestUserId,
    description: "Salário Recorrente",
    referenceValue: 1999.99,
    expectedDayOfMonth: 5,
    type: "INCOME",
    paymentMethod: "TRANSFER",
    frequency: "MONTHLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      months: 3
    }))
  },
  {
    userId: guestUserId,
    description: "Aluguel Recorrente",
    referenceValue: 789.12,
    expectedDayOfMonth: 9,
    type: "EXPENSE",
    paymentMethod: "TRANSFER",
    frequency: "MONTHLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      months: 7
    }))
  },
  {
    userId: guestUserId,
    description: "Assinatura Recorrente 1",
    referenceValue: 49.99,
    expectedDayOfMonth: 7,
    type: "EXPENSE",
    paymentMethod: "CREDIT",
    frequency: "MONTHLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      months: 1
    }))
  },
  {
    userId: guestUserId,
    description: "Assinatura Recorrente 2",
    referenceValue: 35.00,
    expectedDayOfMonth: 1,
    type: "EXPENSE",
    paymentMethod: "CREDIT",
    frequency: "MONTHLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      months: 2
    })),
    endDate: guestStartOfMonth(guestAdd(guestCurrentDate, {
      years: 1
    }))
  },
  {
    userId: guestUserId,
    description: "Investimento Recorrente",
    referenceValue: 1000,
    expectedDayOfMonth: 22,
    type: "INVESTMENT",
    paymentMethod: "TRANSFER",
    frequency: "MONTHLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      months: 1
    }))
  },
  {
    userId: guestUserId,
    description: "Previdência Recorrente",
    referenceValue: 299.99,
    expectedDayOfMonth: 25,
    type: "PENSION",
    paymentMethod: "PIX",
    frequency: "MONTHLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      months: 8
    }))
  },
  {
    userId: guestUserId,
    description: "Caixinha Recorrente",
    referenceValue: 199.99,
    expectedDayOfMonth: 25,
    type: "WALLET",
    paymentMethod: "PIX",
    frequency: "MONTHLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      months: 2
    }))
  },
  {
    userId: guestUserId,
    description: "Imposto Anual",
    referenceValue: 199.99,
    expectedDayOfMonth: 25,
    expectedMonthOfYear: 0,
    type: "EXPENSE",
    paymentMethod: "PIX",
    frequency: "YEARLY",
    startDate: guestStartOfMonth(guestSub(guestCurrentDate, {
      years: 4
    }))
  }
]

const guestTransactions = [
  {
    amount: 5678.45,
    date: guestSetDate(guestCurrentDate, 5),
    description: "Salário",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId: guestUserId,
  },
  {
    amount: 254,
    date: guestSetDate(guestCurrentDate, 7),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId: guestUserId,
  },
  {
    amount: 56.88,
    date: guestSetDate(guestCurrentDate, 14),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId: guestUserId,
  },
  {
    amount: 123.45,
    date: guestSetDate(guestCurrentDate, 2),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId: guestUserId,
  },
  {
    amount: 183.77,
    date: guestSetDate(guestCurrentDate, 21),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId: guestUserId,
  },
  {
    amount: 1200,
    date: guestSetDate(guestCurrentDate, 7),
    description: "Aluguel",
    paymentMethod: "TRANSFER",
    type: "EXPENSE",
    userId: guestUserId,
  },
  {
    amount: 200,
    date: guestSetDate(guestCurrentDate, 2),
    description: "Mercado",
    paymentMethod: "PIX",
    type: "EXPENSE",
    userId: guestUserId,
  },
  {
    amount: 50,
    date: guestSetDate(guestCurrentDate, 14),
    description: "Farmácia",
    paymentMethod: "CREDIT",
    type: "EXPENSE",
    userId: guestUserId,
  },
  {
    amount: 30,
    date: guestSetDate(guestCurrentDate, 21),
    description: "Combustível",
    paymentMethod: "DEBIT",
    type: "EXPENSE",
    userId: guestUserId,
  },
  {
    amount: 2356.78,
    date: guestSetDate(guestCurrentDate, 8),
    description: "Aplicação",
    paymentMethod: "TRANSFER",
    type: "INVESTMENT",
    userId: guestUserId,
  },
  {
    amount: 100,
    date: guestSetDate(guestCurrentDate, 26),
    description: "Viagens",
    paymentMethod: "TRANSFER",
    type: "WALLET",
    userId: guestUserId,
  },
  {
    amount: 500,
    date: guestSetDate(guestCurrentDate, 26),
    description: "Presentes",
    paymentMethod: "TRANSFER",
    type: "WALLET",
    userId: guestUserId,
  },
  {
    amount: 150,
    date: guestSetDate(guestCurrentDate, 26),
    description: "Previdência",
    paymentMethod: "TRANSFER",
    type: "PENSION",
    userId: guestUserId,
  }
]

const guestTicker = [
  {
    symbol: "PETR4",
    name: "Petrobras",
    type: "STOCK",
    price: 39.03,
    change: 0.30,
    changePercent: 0.078,
  },
  {
    symbol: "VALE3",
    name: "Vale",
    type: "STOCK",
    price: 50.67,
    change: 0.50,
    changePercent: 0.005,
  },
  {
    symbol: "IVVB11",
    name: "S&P 500",
    type: "INTERNATIONAL",
    price: 400.56,
    change: 1.50,
    changePercent: 0.0075,
  },
  {
    symbol: "QBTC11",
    name: "Bitcoin",
    type: "CRYPTO",
    price: 40.67,
    change: 1000,
    changePercent: 0.005,
  },
  {
    symbol: "GOLD11",
    name: "Ouro",
    type: "GOLD",
    price: 18.99,
    change: 5,
    changePercent: 0.02,
  },
  {
    symbol: "HGLG11",
    name: "HG Logística",
    type: "REIT",
    price: 40.67,
    change: 2,
    changePercent: 0.013,
  },
  {
    symbol: "XPML11",
    name: "XP Malls",
    type: "REIT",
    price: 74.76,
    change: -1,
    changePercent: -0.01,
  }
]

const guestTickerOrders = [
  {
    userId: guestUserId,
    ticker: "PETR4",
    type: "BUY",
    quantity: 100,
    price: 40,
    createdAt: guestSubDays(guestCurrentDate, 30),
    updatedAt: guestSubDays(guestCurrentDate, 30),
  },
  {
    userId: guestUserId,
    ticker: "PETR4",
    type: "BUY",
    quantity: 100,
    price: 44,
    createdAt: guestSubDays(guestCurrentDate, 25),
    updatedAt: guestSubDays(guestCurrentDate, 25),
  },
  {
    userId: guestUserId,
    ticker: "PETR4",
    type: "SELL",
    quantity: 50,
    price: 48,
    createdAt: guestSubDays(guestCurrentDate, 20),
    updatedAt: guestSubDays(guestCurrentDate, 20),
  },
  {
    userId: guestUserId,
    ticker: "PETR4",
    type: "BUY",
    quantity: 150,
    price: 36,
    createdAt: guestSubDays(guestCurrentDate, 17),
    updatedAt: guestSubDays(guestCurrentDate, 17),
  },
  {
    userId: guestUserId,
    ticker: "VALE3",
    type: "BUY",
    quantity: 100,
    price: 100,
    createdAt: guestSubDays(guestCurrentDate, 30),
    updatedAt: guestSubDays(guestCurrentDate, 30),
  },
  {
    userId: guestUserId,
    ticker: "VALE3",
    type: "SELL",
    quantity: 100,
    price: 112.67,
    createdAt: guestSubDays(guestCurrentDate, 28),
    updatedAt: guestSubDays(guestCurrentDate, 28),
  },
  {
    userId: guestUserId,
    ticker: "VALE3",
    type: "BUY",
    quantity: 88,
    price: 99.88,
    createdAt: guestSubDays(guestCurrentDate, 12),
    updatedAt: guestSubDays(guestCurrentDate, 12),
  },
  {
    userId: guestUserId,
    ticker: "VALE3",
    type: "SELL",
    quantity: 12,
    price: 102.88,
    createdAt: guestSubDays(guestCurrentDate, 7),
    updatedAt: guestSubDays(guestCurrentDate, 7),
  },
  {
    userId: guestUserId,
    ticker: "VALE3",
    type: "BUY",
    quantity: 26,
    price: 99.88,
    createdAt: guestSubDays(guestCurrentDate, 3),
    updatedAt: guestSubDays(guestCurrentDate, 3),
  },
  {
    userId: guestUserId,
    ticker: "GOLD11",
    type: "BUY",
    quantity: 40,
    price: 15.44,
    createdAt: guestSubDays(guestCurrentDate, 30),
    updatedAt: guestSubDays(guestCurrentDate, 30),
  },
  {
    userId: guestUserId,
    ticker: "HGLG11",
    type: "BUY",
    quantity: 14,
    price: 75.34,
    createdAt: guestSubDays(guestCurrentDate, 30),
    updatedAt: guestSubDays(guestCurrentDate, 30),
  },
  {
    userId: guestUserId,
    ticker: "IVVB11",
    type: "BUY",
    quantity: 8,
    price: 378.34,
    createdAt: guestSubDays(guestCurrentDate, 30),
    updatedAt: guestSubDays(guestCurrentDate, 30),
  },
  {
    userId: guestUserId,
    ticker: "QBTC11",
    type: "BUY",
    quantity: 13,
    price: 35.36,
    createdAt: guestSubDays(guestCurrentDate, 30),
    updatedAt: guestSubDays(guestCurrentDate, 30),
  },
  {
    userId: guestUserId,
    ticker: "XPML11",
    type: "BUY",
    quantity: 10,
    price: 80.59,
    createdAt: guestSubDays(guestCurrentDate, 30),
    updatedAt: guestSubDays(guestCurrentDate, 30),
  }
]

const guestFixedIncomes = [
  {
    userId: guestUserId,
    description: "Tesouro Selic",
    initialInvestment: 1000,
    currentValue: 1050,
    date: guestSubDays(guestCurrentDate, 55),
    posFixedIndex: "SELIC"
  },
  {
    userId: guestUserId,
    description: "Tesouro IPCA 2035",
    initialInvestment: 1000,
    currentValue: 1100,
    date: guestSubDays(guestCurrentDate, 27),
    dueDate: new Date("2035-05-15"),
    posFixedIndex: "IPCA"
  },
  {
    userId: guestUserId,
    description: "Tesouro Prefixado",
    initialInvestment: 1000,
    currentValue: 1150,
    date: guestSubDays(guestCurrentDate, 43),
    fixedRate: 0.1
  }
]

const guestOtherAssets = [
  {
    userId: guestUserId,
    description: "Imóvel",
    value: 3500,
    type: "PROPERTY",
  },
  {
    userId: guestUserId,
    description: "Carro",
    value: 1000,
    type: "PROPERTY",
  },
  {
    userId: guestUserId,
    description: "Reserva de Emergência",
    value: 10000,
    type: "CASH_BOX",
  },
  {
    userId: guestUserId,
    description: "Previdência Privada",
    value: 5000,
    type: "PENSION",
  }
]

const guestAssetsHistories = [
  {
    userId: guestUserId,
    date: guestSubMonths(guestCurrentDate, 1),
    stocksTotalValue: 15_000,
    reitsTotalValue: 1_000,
    etfsTotalValue: 500,
    internationalsTotalValue: 2_000,
    cryptosTotalValue: 300,
    goldsTotalValue: 600,
    cashBoxesTotalValue: 9_600,
    pensionsTotalValue: 4800,
    fixedIncomesTotalValue: 3100,
    propertiesTotalValue: 4_000,
    sharesTotalValue: 0,
    financialInjectionsValue: 200,
    generalTotalValue: 44_700
  },
  {
    userId: guestUserId,
    date: guestSubMonths(guestCurrentDate, 2),
    stocksTotalValue: 14_000,
    reitsTotalValue: 900,
    etfsTotalValue: 450,
    internationalsTotalValue: 1_800,
    cryptosTotalValue: 280,
    goldsTotalValue: 570,
    cashBoxesTotalValue: 9_300,
    pensionsTotalValue: 4500,
    fixedIncomesTotalValue: 3000,
    propertiesTotalValue: 4_000,
    sharesTotalValue: 0,
    financialInjectionsValue: 200,
    generalTotalValue: 43_000
  },
  {
    userId: guestUserId,
    date: guestSubMonths(guestCurrentDate, 3),
    stocksTotalValue: 13_200,
    reitsTotalValue: 900,
    etfsTotalValue: 450,
    internationalsTotalValue: 1_800,
    cryptosTotalValue: 280,
    goldsTotalValue: 570,
    cashBoxesTotalValue: 9_300,
    pensionsTotalValue: 4500,
    fixedIncomesTotalValue: 3000,
    propertiesTotalValue: 4_000,
    sharesTotalValue: 0,
    financialInjectionsValue: 200,
    generalTotalValue: 41_560
  },
  {
    userId: guestUserId,
    date: guestSubMonths(guestCurrentDate, 4),
    stocksTotalValue: 14_000,
    reitsTotalValue: 900,
    etfsTotalValue: 450,
    internationalsTotalValue: 1_800,
    cryptosTotalValue: 280,
    goldsTotalValue: 570,
    cashBoxesTotalValue: 9_300,
    pensionsTotalValue: 4500,
    fixedIncomesTotalValue: 3000,
    propertiesTotalValue: 4_000,
    sharesTotalValue: 0,
    financialInjectionsValue: 200,
    generalTotalValue: 38_600
  },
  {
    userId: guestUserId,
    date: guestSubMonths(guestCurrentDate, 5),
    stocksTotalValue: 14_000,
    reitsTotalValue: 900,
    etfsTotalValue: 450,
    internationalsTotalValue: 1_800,
    cryptosTotalValue: 280,
    goldsTotalValue: 570,
    cashBoxesTotalValue: 9_300,
    pensionsTotalValue: 4500,
    fixedIncomesTotalValue: 3000,
    propertiesTotalValue: 4_000,
    sharesTotalValue: 0,
    financialInjectionsValue: 200,
    generalTotalValue: 38_280
  }
]

async function guestSeed() {
  if (!guestUserId || guestUserId === "") {
    throw new Error("NEXT_PUBLIC_KINDE_GUEST_USER_ID is not defined")
  }

  await guestPrismaClient.task.createMany({ data: guestTasks })
  await guestPrismaClient.taskList.createMany({ data: guestTaskLists })
  await guestPrismaClient.transaction.createMany({ data: guestTransactions })
  await guestPrismaClient.recurringTransaction.createMany({ data: guestRecurringTransactions })
  try {
    await guestPrismaClient.ticker.createMany({ data: guestTicker })
  } catch (error) {

  }
  try {
    await guestPrismaClient.tickerOrder.createMany({ data: guestTickerOrders })
  } catch (error) {

  }
  await guestPrismaClient.fixedIncome.createMany({ data: guestFixedIncomes })
  await guestPrismaClient.otherAsset.createMany({ data: guestOtherAssets })
  await guestPrismaClient.assetHistory.createMany({ data: guestAssetsHistories })
}

guestSeed()
  .then(async () => {
    await guestPrismaClient.$disconnect()

    console.log("Guest Seed completed  🌱")
  })
  .catch(async (e) => {
    console.error(e)
    await guestPrismaClient.$disconnect()
    process.exit(1)
  })