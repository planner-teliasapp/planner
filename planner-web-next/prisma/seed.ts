const { PrismaClient } = require("@prisma/client")
const { setDate } = require("date-fns")

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

async function seed() {
  if (!userId || userId === "") {
    throw new Error("DATABASE_SEED_USER_ID is not defined")
  }

  await prismaClient.transaction.createMany({ data: transactions })
  await prismaClient.task.createMany({ data: tasks })
  await prismaClient.taskList.createMany({ data: taskLists })
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