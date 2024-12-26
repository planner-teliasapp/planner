-- CreateTable
CREATE TABLE "asset_histories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stocks_total_value" DECIMAL(10,2) NOT NULL,
    "reits_total_value" DECIMAL(10,2) NOT NULL,
    "etfs_total_value" DECIMAL(10,2) NOT NULL,
    "internationals_total_value" DECIMAL(10,2) NOT NULL,
    "cryptos_total_value" DECIMAL(10,2) NOT NULL,
    "golds_total_value" DECIMAL(10,2) NOT NULL,
    "cash_boxes_total_value" DECIMAL(10,2) NOT NULL,
    "pensions_total_value" DECIMAL(10,2) NOT NULL,
    "fixed_incomes_total_value" DECIMAL(10,2) NOT NULL,
    "properties_total_value" DECIMAL(10,2) NOT NULL,
    "shares_total_value" DECIMAL(10,2) NOT NULL,
    "financial_injections_value" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "general_total_value" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "asset_histories_pkey" PRIMARY KEY ("id")
);
