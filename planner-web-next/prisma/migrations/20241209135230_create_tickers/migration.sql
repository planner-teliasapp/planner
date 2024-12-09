-- CreateEnum
CREATE TYPE "TickerType" AS ENUM ('STOCK', 'ETF', 'REIT', 'GOLD', 'CRYPTO', 'INTERNATIONAL');

-- CreateTable
CREATE TABLE "tickers" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TickerType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "change" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "change_percent" DECIMAL(4,3) NOT NULL DEFAULT 0,
    "auto_update" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickers_pkey" PRIMARY KEY ("id")
);
