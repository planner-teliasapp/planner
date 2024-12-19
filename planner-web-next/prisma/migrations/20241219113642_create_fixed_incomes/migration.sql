-- CreateEnum
CREATE TYPE "PosFixedIndexType" AS ENUM ('NONE', 'CDI', 'IPCA', 'IGPM', 'INPC', 'SELIC');

-- CreateTable
CREATE TABLE "fixed_incomes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "initial_investment" DECIMAL(10,2) NOT NULL,
    "current_value" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3),
    "fixed_rate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "pos_fixed_index" "PosFixedIndexType" NOT NULL DEFAULT 'NONE',
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fixed_incomes_pkey" PRIMARY KEY ("id")
);
