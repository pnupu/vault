-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradingHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "asset" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION,
    "strategyId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentAllocation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "asset" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentAsset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "assetTicker" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "valueUSD" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "assetTicker" TEXT NOT NULL,
    "apy" DOUBLE PRECISION NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "platform" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStrategyAllocation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "assetTicker" TEXT NOT NULL,
    "allocatedAmount" DOUBLE PRECISION NOT NULL,
    "entryTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cumulativeYieldEarned" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastYieldClaimTimestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStrategyAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE INDEX "TradingHistory_userId_idx" ON "TradingHistory"("userId");

-- CreateIndex
CREATE INDEX "TradingHistory_strategyId_idx" ON "TradingHistory"("strategyId");

-- CreateIndex
CREATE INDEX "CurrentAllocation_userId_idx" ON "CurrentAllocation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentAllocation_userId_asset_key" ON "CurrentAllocation"("userId", "asset");

-- CreateIndex
CREATE INDEX "CurrentAsset_userId_idx" ON "CurrentAsset"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentAsset_userId_assetTicker_key" ON "CurrentAsset"("userId", "assetTicker");

-- CreateIndex
CREATE UNIQUE INDEX "Strategy_name_key" ON "Strategy"("name");

-- CreateIndex
CREATE INDEX "Strategy_assetTicker_idx" ON "Strategy"("assetTicker");

-- CreateIndex
CREATE INDEX "UserStrategyAllocation_userId_idx" ON "UserStrategyAllocation"("userId");

-- CreateIndex
CREATE INDEX "UserStrategyAllocation_strategyId_idx" ON "UserStrategyAllocation"("strategyId");

-- CreateIndex
CREATE INDEX "UserStrategyAllocation_assetTicker_idx" ON "UserStrategyAllocation"("assetTicker");

-- CreateIndex
CREATE UNIQUE INDEX "UserStrategyAllocation_userId_strategyId_assetTicker_key" ON "UserStrategyAllocation"("userId", "strategyId", "assetTicker");

-- AddForeignKey
ALTER TABLE "TradingHistory" ADD CONSTRAINT "TradingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradingHistory" ADD CONSTRAINT "TradingHistory_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentAllocation" ADD CONSTRAINT "CurrentAllocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentAsset" ADD CONSTRAINT "CurrentAsset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStrategyAllocation" ADD CONSTRAINT "UserStrategyAllocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStrategyAllocation" ADD CONSTRAINT "UserStrategyAllocation_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
