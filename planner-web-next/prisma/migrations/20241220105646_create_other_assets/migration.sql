-- CreateEnum
CREATE TYPE "OthersAssetsTypes" AS ENUM ('CASH_BOX', 'PENSION', 'PROPERTY', 'SHARE', 'FINANCIAL_INJECTION');

-- CreateTable
CREATE TABLE "other_assets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "type" "OthersAssetsTypes" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "other_assets_pkey" PRIMARY KEY ("id")
);
