/*
  Warnings:

  - Changed the type of `riskLevel` on the `Strategy` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('NORMAL', 'AGGRESSIVE');

-- AlterTable
ALTER TABLE "Strategy" ADD COLUMN     "image" TEXT,
DROP COLUMN "riskLevel",
ADD COLUMN     "riskLevel" "RiskLevel" NOT NULL;

-- CreateTable
CREATE TABLE "YieldOpportunity" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "platformImage" TEXT,
    "name" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "assetTicker" TEXT NOT NULL,
    "apy" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YieldOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YieldOpportunity_platform_idx" ON "YieldOpportunity"("platform");

-- CreateIndex
CREATE INDEX "YieldOpportunity_assetTicker_idx" ON "YieldOpportunity"("assetTicker");

-- CreateIndex
CREATE UNIQUE INDEX "YieldOpportunity_platform_marketId_key" ON "YieldOpportunity"("platform", "marketId");
