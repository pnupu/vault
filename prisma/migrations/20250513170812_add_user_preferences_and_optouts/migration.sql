-- CreateTable
CREATE TABLE "UserStrategyPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "receiveNotifications" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStrategyPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserYieldOpportunityOptOut" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "yieldOpportunityId" TEXT NOT NULL,
    "optedOutAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserYieldOpportunityOptOut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserStrategyPreference_userId_idx" ON "UserStrategyPreference"("userId");

-- CreateIndex
CREATE INDEX "UserStrategyPreference_strategyId_idx" ON "UserStrategyPreference"("strategyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserStrategyPreference_userId_strategyId_key" ON "UserStrategyPreference"("userId", "strategyId");

-- CreateIndex
CREATE INDEX "UserYieldOpportunityOptOut_userId_idx" ON "UserYieldOpportunityOptOut"("userId");

-- CreateIndex
CREATE INDEX "UserYieldOpportunityOptOut_yieldOpportunityId_idx" ON "UserYieldOpportunityOptOut"("yieldOpportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserYieldOpportunityOptOut_userId_yieldOpportunityId_key" ON "UserYieldOpportunityOptOut"("userId", "yieldOpportunityId");

-- AddForeignKey
ALTER TABLE "UserStrategyPreference" ADD CONSTRAINT "UserStrategyPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStrategyPreference" ADD CONSTRAINT "UserStrategyPreference_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserYieldOpportunityOptOut" ADD CONSTRAINT "UserYieldOpportunityOptOut_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserYieldOpportunityOptOut" ADD CONSTRAINT "UserYieldOpportunityOptOut_yieldOpportunityId_fkey" FOREIGN KEY ("yieldOpportunityId") REFERENCES "YieldOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
