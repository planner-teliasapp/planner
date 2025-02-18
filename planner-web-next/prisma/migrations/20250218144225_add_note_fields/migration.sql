-- AlterTable
ALTER TABLE "fixed_incomes" ADD COLUMN     "agency" TEXT,
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "other_assets" ADD COLUMN     "agency" TEXT,
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "tickers" ADD COLUMN     "agency" TEXT,
ADD COLUMN     "note" TEXT;
