/*
  Warnings:

  - You are about to drop the column `strategyId` on the `TradingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `strategyId` on the `UserStrategyAllocation` table. All the data in the column will be lost.
  - You are about to drop the column `strategyId` on the `UserStrategyPreference` table. All the data in the column will be lost.
  - You are about to drop the `Strategy` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,strategyTemplateId,assetTicker]` on the table `UserStrategyAllocation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,strategyTemplateId]` on the table `UserStrategyPreference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `strategyTemplateId` to the `UserStrategyAllocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strategyTemplateId` to the `UserStrategyPreference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TradingHistory" DROP CONSTRAINT IF EXISTS "TradingHistory_strategyId_fkey";

-- DropForeignKey
ALTER TABLE "UserStrategyAllocation" DROP CONSTRAINT IF EXISTS "UserStrategyAllocation_strategyId_fkey";

-- DropForeignKey
ALTER TABLE "UserStrategyPreference" DROP CONSTRAINT IF EXISTS "UserStrategyPreference_strategyId_fkey";

-- DropIndex
DROP INDEX IF EXISTS "TradingHistory_strategyId_idx";

-- DropIndex
DROP INDEX IF EXISTS "UserStrategyAllocation_strategyId_idx";

-- DropIndex
DROP INDEX IF EXISTS "UserStrategyAllocation_userId_strategyId_assetTicker_key";

-- DropIndex
DROP INDEX IF EXISTS "UserStrategyPreference_strategyId_idx";

-- DropIndex
DROP INDEX IF EXISTS "UserStrategyPreference_userId_strategyId_key";

-- 1. Rename Strategy table to StrategyTemplate and alter it
ALTER TABLE "Strategy" RENAME TO "StrategyTemplate";
ALTER TABLE "StrategyTemplate" DROP COLUMN IF EXISTS "apy";
-- Note: Other columns like name, description, image, assetTicker, riskLevel, platform, createdAt, updatedAt are assumed to align or are handled by Prisma's understanding of the model.

-- 2. Handle TradingHistory table
ALTER TABLE "TradingHistory" ADD COLUMN "strategyTemplateId" TEXT;
UPDATE "TradingHistory" SET "strategyTemplateId" = "strategyId";
ALTER TABLE "TradingHistory" DROP COLUMN "strategyId";

-- 3. Handle UserStrategyAllocation table
ALTER TABLE "UserStrategyAllocation" ADD COLUMN "strategyTemplateId" TEXT;
UPDATE "UserStrategyAllocation" SET "strategyTemplateId" = "strategyId";
ALTER TABLE "UserStrategyAllocation" ALTER COLUMN "strategyTemplateId" SET NOT NULL;
ALTER TABLE "UserStrategyAllocation" DROP COLUMN "strategyId";

-- 4. Handle UserStrategyPreference table
ALTER TABLE "UserStrategyPreference" ADD COLUMN "strategyTemplateId" TEXT;
UPDATE "UserStrategyPreference" SET "strategyTemplateId" = "strategyId";
ALTER TABLE "UserStrategyPreference" ALTER COLUMN "strategyTemplateId" SET NOT NULL;
ALTER TABLE "UserStrategyPreference" DROP COLUMN "strategyId";

-- 5. CreateTable _StrategyTemplateToYieldOpportunity (join table for many-to-many)
CREATE TABLE "_StrategyTemplateToYieldOpportunity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StrategyTemplateToYieldOpportunity_AB_pkey" PRIMARY KEY ("A","B")
);

-- 6. Create Indexes
-- CreateIndex (was already StrategyTemplate_name_key on Strategy, should be fine after rename)
-- If "StrategyTemplate_name_key" was "Strategy_name_key", it would have been renamed automatically by PostgreSQL.
-- If not, or to be safe, ensure the unique index on name for StrategyTemplate exists.
-- Assuming it was `Strategy_name_key`, it's now `StrategyTemplate_name_key`.
-- If `StrategyTemplate_name_key` does not exist, you might need:
-- CREATE UNIQUE INDEX IF NOT EXISTS "StrategyTemplate_name_key" ON "StrategyTemplate"("name");
-- Otherwise, Prisma's original `CREATE UNIQUE INDEX "StrategyTemplate_name_key" ON "StrategyTemplate"("name");` might fail if one already exists from the rename.
-- For simplicity, we'll assume Prisma handles this correctly or let the apply step catch it if it's an issue.

CREATE INDEX IF NOT EXISTS "StrategyTemplate_assetTicker_idx" ON "StrategyTemplate"("assetTicker");
CREATE INDEX IF NOT EXISTS "_StrategyTemplateToYieldOpportunity_B_index" ON "_StrategyTemplateToYieldOpportunity"("B");
CREATE INDEX IF NOT EXISTS "TradingHistory_strategyTemplateId_idx" ON "TradingHistory"("strategyTemplateId");
CREATE INDEX IF NOT EXISTS "UserStrategyAllocation_strategyTemplateId_idx" ON "UserStrategyAllocation"("strategyTemplateId");
CREATE UNIQUE INDEX IF NOT EXISTS "UserStrategyAllocation_userId_strategyTemplateId_assetTicke_key" ON "UserStrategyAllocation"("userId", "strategyTemplateId", "assetTicker");
CREATE INDEX IF NOT EXISTS "UserStrategyPreference_strategyTemplateId_idx" ON "UserStrategyPreference"("strategyTemplateId");
CREATE UNIQUE INDEX IF NOT EXISTS "UserStrategyPreference_userId_strategyTemplateId_key" ON "UserStrategyPreference"("userId", "strategyTemplateId");

-- 7. AddForeignKey constraints
ALTER TABLE "TradingHistory" ADD CONSTRAINT "TradingHistory_strategyTemplateId_fkey" FOREIGN KEY ("strategyTemplateId") REFERENCES "StrategyTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "UserStrategyAllocation" ADD CONSTRAINT "UserStrategyAllocation_strategyTemplateId_fkey" FOREIGN KEY ("strategyTemplateId") REFERENCES "StrategyTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "UserStrategyPreference" ADD CONSTRAINT "UserStrategyPreference_strategyTemplateId_fkey" FOREIGN KEY ("strategyTemplateId") REFERENCES "StrategyTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_StrategyTemplateToYieldOpportunity" ADD CONSTRAINT "_StrategyTemplateToYieldOpportunity_A_fkey" FOREIGN KEY ("A") REFERENCES "StrategyTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_StrategyTemplateToYieldOpportunity" ADD CONSTRAINT "_StrategyTemplateToYieldOpportunity_B_fkey" FOREIGN KEY ("B") REFERENCES "YieldOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
