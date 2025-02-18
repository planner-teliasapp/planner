/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `asset_balance_strategies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "asset_balance_strategies_user_id_key" ON "asset_balance_strategies"("user_id");
