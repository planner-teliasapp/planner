-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'INVESTMENT', 'PENSION', 'WALLET');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('DEBIT', 'CREDIT', 'PIX', 'TRANSFER');

-- CreateEnum
CREATE TYPE "TransactionFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "recurring_transaction_id" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurring_transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reference_value" DECIMAL(10,2) NOT NULL,
    "expected_day_of_month" INTEGER,
    "expected_day_of_week" INTEGER,
    "expected_month_of_year" INTEGER,
    "type" "TransactionType" NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "frequency" "TransactionFrequency" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "recurring_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "transactions_user_id_recurring_transaction_id_date_idx" ON "transactions"("user_id", "recurring_transaction_id", "date");

-- CreateIndex
CREATE INDEX "recurring_transactions_user_id_frequency_start_date_end_dat_idx" ON "recurring_transactions"("user_id", "frequency", "start_date", "end_date");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_recurring_transaction_id_fkey" FOREIGN KEY ("recurring_transaction_id") REFERENCES "recurring_transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
