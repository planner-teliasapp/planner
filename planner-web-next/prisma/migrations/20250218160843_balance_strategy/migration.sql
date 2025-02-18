-- CreateTable
CREATE TABLE "asset_balance_strategies" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "notes" TEXT,
    "cash_box" DECIMAL(10,2) NOT NULL,
    "fixed_income" DECIMAL(10,2) NOT NULL,
    "variable_income" DECIMAL(10,2) NOT NULL,
    "pension" DECIMAL(10,2) NOT NULL,
    "property" DECIMAL(10,2) NOT NULL,
    "share" DECIMAL(10,2) NOT NULL,
    "reit" DECIMAL(10,2) NOT NULL,
    "international" DECIMAL(10,2) NOT NULL,
    "gold" DECIMAL(10,2) NOT NULL,
    "crypto" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "asset_balance_strategies_pkey" PRIMARY KEY ("id")
);
