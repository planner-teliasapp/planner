const { PrismaClient: DeleteGuestPrismaClient } = require("@prisma/client")

const deleteGuestPrismaClient = new PrismaClient()
const deleteGuestUserId = process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID || ""

async function deleteGuestData() {
  if (!userId || userId === "") {
    throw new Error("NEXT_PUBLIC_KINDE_GUEST_USER_ID is not defined")
  }

  await prismaClient.task.deleteMany({ where: { userId } })
  await prismaClient.taskList.deleteMany({ where: { userId } })
  await prismaClient.transaction.deleteMany({ where: { userId } })
  await prismaClient.recurringTransaction.deleteMany({ where: { userId } })
  await prismaClient.tickerOrder.deleteMany({ where: { userId } })
  await prismaClient.fixedIncome.deleteMany({ where: { userId } })
  await prismaClient.otherAsset.deleteMany({ where: { userId } })
  await prismaClient.assetHistory.deleteMany({ where: { userId } })
}

deleteGuestData()
  .then(async () => {
    await prismaClient.$disconnect()

    console.log("Guest Data deleted  ❌")
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })