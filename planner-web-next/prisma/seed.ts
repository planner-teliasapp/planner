const { PrismaClient } = require("@prisma/client")
const { setDate, add, endOfMonth, startOfMonth, sub, subDays, subMonths } = require("date-fns")

const prismaClient = new PrismaClient()
const userId = process.env.DATABASE_SEED_USER_ID || ""
const currentDate = new Date()

const tasks = [
  {
    title: "Estudar para a certificação",
    userId
  },
  {
    title: "Fazer o desafio de programação",
    userId
  },
  {
    title: "Estudar para a faculdade",
    userId
  },
  {
    title: "Fazer exercícios",
    userId
  },
  {
    title: "Estudar inglês",
    userId
  },
  {
    title: "Fazer teste",
    userId
  },
  {
    title: "Fazer compras",
    userId
  },
  {
    title: "Revisar o conteúdo",
    userId
  }
]

const taskLists = [
  {
    title: "Estudos",
    userId,
  },
  {
    title: "Compras",
    userId,
  },
  {
    title: "Trabalho",
    userId,
  }
]

const recurringTransactions = [
  {
    userId,
    description: "Salário Recorrente",
    referenceValue: 1999.99,
    expectedDayOfMonth: 5,
    type: "INCOME",
    paymentMethod: "TRANSFER",
    frequency: "MONTHLY",
    startDate: startOfMonth(sub(currentDate, {
      months: 3
    }))
  },
  {
    userId,
    description: "Aluguel Recorrente",
    referenceValue: 789.12,
    expectedDayOfMonth: 9,
    type: "EXPENSE",
    paymentMethod: "TRANSFER",
    frequency: "MONTHLY",
    startDate: startOfMonth(sub(currentDate, {
      months: 7
    }))
  },
  {
    userId,
    description: "Assinatura Recorrente 1",
    referenceValue: 49.99,
    expectedDayOfMonth: 7,
    type: "EXPENSE",
    paymentMethod: "CREDIT",
    frequency: "MONTHLY",
    startDate: startOfMonth(sub(currentDate, {
      months: 1
    }))
  },
  {
    userId,
    description: "Assinatura Recorrente 2",
    referenceValue: 35.00,
    expectedDayOfMonth: 1,
    type: "EXPENSE",
    paymentMethod: "CREDIT",
    frequency: "MONTHLY",
    startDate: startOfMonth(sub(currentDate, {
      months: 2
    })),
    endDate: startOfMonth(add(currentDate, {
      years: 1
    }))
  },
  {
    userId,
    description: "Investimento Recorrente",
    referenceValue: 1000,
    expectedDayOfMonth: 22,
    type: "INVESTMENT",
    paymentMethod: "TRANSFER",
    frequency: "MONTHLY",
    startDate: startOfMonth(sub(currentDate, {
      months: 1
    }))
  },
  {
    userId,
    description: "Previdência Recorrente",
    referenceValue: 299.99,
    expectedDayOfMonth: 25,
    type: "PENSION",
    paymentMethod: "PIX",
    frequency: "MONTHLY",
    startDate: startOfMonth(sub(currentDate, {
      months: 8
    }))
  },
  {
    userId,
    description: "Caixinha Recorrente",
    referenceValue: 199.99,
    expectedDayOfMonth: 25,
    type: "WALLET",
    paymentMethod: "PIX",
    frequency: "MONTHLY",
    startDate: startOfMonth(sub(currentDate, {
      months: 2
    }))
  },
  {
    userId,
    description: "Imposto Anual",
    referenceValue: 199.99,
    expectedDayOfMonth: 25,
    expectedMonthOfYear: 0,
    type: "EXPENSE",
    paymentMethod: "PIX",
    frequency: "YEARLY",
    startDate: startOfMonth(sub(currentDate, {
      years: 4
    }))
  }
]

const transactions = [
  {
    amount: 5678.45,
    date: setDate(currentDate, 5),
    description: "Salário",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId,
  },
  {
    amount: 254,
    date: setDate(currentDate, 7),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId,
  },
  {
    amount: 56.88,
    date: setDate(currentDate, 14),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId,
  },
  {
    amount: 123.45,
    date: setDate(currentDate, 2),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId,
  },
  {
    amount: 183.77,
    date: setDate(currentDate, 21),
    description: "Rendimentos",
    paymentMethod: "TRANSFER",
    type: "INCOME",
    userId,
  },
  {
    amount: 1200,
    date: setDate(currentDate, 7),
    description: "Aluguel",
    paymentMethod: "TRANSFER",
    type: "EXPENSE",
    userId,
  },
  {
    amount: 200,
    date: setDate(currentDate, 2),
    description: "Mercado",
    paymentMethod: "PIX",
    type: "EXPENSE",
    userId,
  },
  {
    amount: 50,
    date: setDate(currentDate, 14),
    description: "Farmácia",
    paymentMethod: "CREDIT",
    type: "EXPENSE",
    userId,
  },
  {
    amount: 30,
    date: setDate(currentDate, 21),
    description: "Combustível",
    paymentMethod: "DEBIT",
    type: "EXPENSE",
    userId,
  },
  {
    amount: 2356.78,
    date: setDate(currentDate, 8),
    description: "Aplicação",
    paymentMethod: "TRANSFER",
    type: "INVESTMENT",
    userId,
  },
  {
    amount: 100,
    date: setDate(currentDate, 26),
    description: "Viagens",
    paymentMethod: "TRANSFER",
    type: "WALLET",
    userId,
  },
  {
    amount: 500,
    date: setDate(currentDate, 26),
    description: "Presentes",
    paymentMethod: "TRANSFER",
    type: "WALLET",
    userId,
  },
  {
    amount: 150,
    date: setDate(currentDate, 26),
    description: "Previdência",
    paymentMethod: "TRANSFER",
    type: "PENSION",
    userId,
  }
]

const ticker = [
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

const tickerOrders = [
  {
    userId,
    ticker: "PETR4",
    type: "BUY",
    quantity: 100,
    price: 40,
    createdAt: subDays(currentDate, 30),
    updatedAt: subDays(currentDate, 30),
  },
  {
    userId,
    ticker: "PETR4",
    type: "BUY",
    quantity: 100,
    price: 44,
    createdAt: subDays(currentDate, 25),
    updatedAt: subDays(currentDate, 25),
  },
  {
    userId,
    ticker: "PETR4",
    type: "SELL",
    quantity: 50,
    price: 48,
    createdAt: subDays(currentDate, 20),
    updatedAt: subDays(currentDate, 20),
  },
  {
    userId,
    ticker: "PETR4",
    type: "BUY",
    quantity: 150,
    price: 36,
    createdAt: subDays(currentDate, 17),
    updatedAt: subDays(currentDate, 17),
  },
  {
    userId,
    ticker: "VALE3",
    type: "BUY",
    quantity: 100,
    price: 100,
    createdAt: subDays(currentDate, 30),
    updatedAt: subDays(currentDate, 30),
  },
  {
    userId,
    ticker: "VALE3",
    type: "SELL",
    quantity: 100,
    price: 112.67,
    createdAt: subDays(currentDate, 28),
    updatedAt: subDays(currentDate, 28),
  },
  {
    userId,
    ticker: "VALE3",
    type: "BUY",
    quantity: 88,
    price: 99.88,
    createdAt: subDays(currentDate, 12),
    updatedAt: subDays(currentDate, 12),
  },
  {
    userId,
    ticker: "VALE3",
    type: "SELL",
    quantity: 12,
    price: 102.88,
    createdAt: subDays(currentDate, 7),
    updatedAt: subDays(currentDate, 7),
  },
  {
    userId,
    ticker: "VALE3",
    type: "BUY",
    quantity: 26,
    price: 99.88,
    createdAt: subDays(currentDate, 3),
    updatedAt: subDays(currentDate, 3),
  },
  {
    userId,
    ticker: "GOLD11",
    type: "BUY",
    quantity: 40,
    price: 15.44,
    createdAt: subDays(currentDate, 30),
    updatedAt: subDays(currentDate, 30),
  },
  {
    userId,
    ticker: "HGLG11",
    type: "BUY",
    quantity: 14,
    price: 75.34,
    createdAt: subDays(currentDate, 30),
    updatedAt: subDays(currentDate, 30),
  },
  {
    userId,
    ticker: "IVVB11",
    type: "BUY",
    quantity: 8,
    price: 378.34,
    createdAt: subDays(currentDate, 30),
    updatedAt: subDays(currentDate, 30),
  },
  {
    userId,
    ticker: "QBTC11",
    type: "BUY",
    quantity: 13,
    price: 35.36,
    createdAt: subDays(currentDate, 30),
    updatedAt: subDays(currentDate, 30),
  },
  {
    userId,
    ticker: "XPML11",
    type: "BUY",
    quantity: 10,
    price: 80.59,
    createdAt: subDays(currentDate, 30),
    updatedAt: subDays(currentDate, 30),
  }
]

const fixedIncomes = [
  {
    userId,
    description: "Tesouro Selic",
    initialInvestment: 1000,
    currentValue: 1050,
    date: subDays(currentDate, 55),
    posFixedIndex: "SELIC"
  },
  {
    userId,
    description: "Tesouro IPCA 2035",
    initialInvestment: 1000,
    currentValue: 1100,
    date: subDays(currentDate, 27),
    dueDate: new Date("2035-05-15"),
    posFixedIndex: "IPCA"
  },
  {
    userId,
    description: "Tesouro Prefixado",
    initialInvestment: 1000,
    currentValue: 1150,
    date: subDays(currentDate, 43),
    fixedRate: 0.1
  }
]

const otherAssets = [
  {
    userId,
    description: "Imóvel",
    value: 3500,
    type: "PROPERTY",
  },
  {
    userId,
    description: "Carro",
    value: 1000,
    type: "PROPERTY",
  },
  {
    userId,
    description: "Reserva de Emergência",
    value: 10000,
    type: "CASH_BOX",
  },
  {
    userId,
    description: "Previdência Privada",
    value: 5000,
    type: "PENSION",
  }
]

const assetsHistories = [
  {
    userId,
    date: subMonths(currentDate, 1),
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
    generalTotalValue: 570_000
  }
]

async function seed() {
  if (!userId || userId === "") {
    throw new Error("DATABASE_SEED_USER_ID is not defined")
  }

  await prismaClient.task.createMany({ data: tasks })
  await prismaClient.taskList.createMany({ data: taskLists })
  await prismaClient.transaction.createMany({ data: transactions })
  await prismaClient.recurringTransaction.createMany({ data: recurringTransactions })
  await prismaClient.ticker.createMany({ data: ticker })
  await prismaClient.tickerOrder.createMany({ data: tickerOrders })
  await prismaClient.fixedIncome.createMany({ data: fixedIncomes })
  await prismaClient.otherAsset.createMany({ data: otherAssets })
  await prismaClient.assetHistory.createMany({ data: assetsHistories })
}

seed()
  .then(async () => {
    await prismaClient.$disconnect()

    console.log("Seed completed  🌱")
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })