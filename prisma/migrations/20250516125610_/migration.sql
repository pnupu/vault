-- AlterTable
ALTER TABLE "StrategyTemplate" RENAME CONSTRAINT "Strategy_pkey" TO "StrategyTemplate_pkey";

-- RenameIndex
ALTER INDEX "Strategy_name_key" RENAME TO "StrategyTemplate_name_key";
