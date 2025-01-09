const { PrismaClient: DeleteGuestPrismaClient } = require("@prisma/client")

const deleteGuestPrismaClient = new DeleteGuestPrismaClient()
const deleteGuestUserId = process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID || ""

async function deleteGuestData() {
  if (!deleteGuestUserId || deleteGuestUserId === "") {
    throw new Error("NEXT_PUBLIC_KINDE_GUEST_USER_ID is not defined")
  }

  await deleteGuestPrismaClient.task.deleteMany({ where: { userId: deleteGuestUserId } })
  await deleteGuestPrismaClient.taskList.deleteMany({ where: { userId: deleteGuestUserId } })
  await deleteGuestPrismaClient.transaction.deleteMany({ where: { userId: deleteGuestUserId } })
  await deleteGuestPrismaClient.recurringTransaction.deleteMany({ where: { userId: deleteGuestUserId } })
  await deleteGuestPrismaClient.tickerOrder.deleteMany({ where: { userId: deleteGuestUserId } })
  await deleteGuestPrismaClient.fixedIncome.deleteMany({ where: { userId: deleteGuestUserId } })
  await deleteGuestPrismaClient.otherAsset.deleteMany({ where: { userId: deleteGuestUserId } })
  await deleteGuestPrismaClient.assetHistory.deleteMany({ where: { userId: deleteGuestUserId } })
}

deleteGuestData()
  .then(async () => {
    await deleteGuestPrismaClient.$disconnect()

    console.log("Guest Data deleted  ❌")
  })
  .catch(async (e) => {
    console.error(e)
    await deleteGuestPrismaClient.$disconnect()
    process.exit(1)
  })