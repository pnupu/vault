import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc';
import { prisma } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';
import { RiskLevel, YieldOpportunity, StrategyTemplate } from '@/generated/prisma'; // Assuming generated types are here

// Define the structure for a historical data point
interface HistoricalDataPoint {
  timestamp: string;
  value: number;
}

// Hardcoded historical data
const allHistoricalData: Record<string, HistoricalDataPoint[]> = {
  sol_aggressive: [
    { timestamp: "2025-05-16T01:10:08.282621", value: 1384 },
    { timestamp: "2025-05-17T01:10:08.282621", value: 1384.29 },
    { timestamp: "2025-05-18T01:10:08.282621", value: 1384.74 },
    { timestamp: "2025-05-19T01:10:08.282621", value: 1384.9 },
    { timestamp: "2025-05-20T01:10:08.282621", value: 1384.95 },
    { timestamp: "2025-05-21T01:10:08.282621", value: 1385.45 },
    { timestamp: "2025-05-22T01:10:08.282621", value: 1385.85 },
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
  sol_normal: [
    { timestamp: "2025-05-16T01:10:08.282621", value: 1250 },
    { timestamp: "2025-05-17T01:10:08.282621", value: 1250.19 },
    { timestamp: "2025-05-18T01:10:08.282621", value: 1250.2 },
    { timestamp: "2025-05-19T01:10:08.282621", value: 1250.6 },
    { timestamp: "2025-05-20T01:10:08.282621", value: 1250.8 },
    { timestamp: "2025-05-21T01:10:08.282621", value: 1250.96 },
    { timestamp: "2025-05-22T01:10:08.282621", value: 1251.16 },
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
  stablecoin_aggressive: [
    { timestamp: "2025-05-16T01:10:08.282621", value: 22902 },
    { timestamp: "2025-05-17T01:10:08.282621", value: 22909.59 },
    { timestamp: "2025-05-18T01:10:08.282621", value: 22915.18 },
    { timestamp: "2025-05-19T01:10:08.282621", value: 22926.78 },
    { timestamp: "2025-05-20T01:10:08.282621", value: 22932.78 },
    { timestamp: "2025-05-21T01:10:08.282621", value: 22939.9 },
    { timestamp: "2025-05-22T01:10:08.282621", value: 22947.9 },
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
  stablecoin_normal: [
    { timestamp: "2025-05-16T01:10:08.282621", value: 21000 },
    { timestamp: "2025-05-17T01:10:08.282621", value: 21006.57 },
    { timestamp: "2025-05-18T01:10:08.282621", value: 21007.57 },
    { timestamp: "2025-05-19T01:10:08.282621", value: 21015.7 },
    { timestamp: "2025-05-20T01:10:08.282621", value: 21027.7 },
    { timestamp: "2025-05-21T01:10:08.282621", value: 21032.8 },
    { timestamp: "2025-05-22T01:10:08.282621", value: 21039.8 },
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
};

// Helper function to get the correct historical data key
const getHistoricalDataKey = (template: Pick<StrategyTemplate, 'assetTicker' | 'riskLevel'>): string | null => {
  
  // Adjusted assetTicker conditions to match actual data
  const assetPart = template.assetTicker === 'Solana' ? 'sol' : template.assetTicker === 'USD' ? 'stablecoin' : null; 
  const riskPart = template.riskLevel === RiskLevel.AGGRESSIVE ? 'aggressive' : template.riskLevel === RiskLevel.NORMAL ? 'normal' : null;


  if (assetPart && riskPart) {
    return `${assetPart}_${riskPart}`;
  }
  return null;
};

// Helper function to calculate APY and sources based on risk level and available opportunities
const calculateStrategyDetails = (
  templateName: string,
  riskLevel: RiskLevel,
  availableOpportunities: YieldOpportunity[]
): { apy: number; sources: string[]; description: string } => {
  let opportunityAPYs: number[] = [];
  let opportunityNames: string[] = [];
  let description = `Dynamic ${riskLevel.toLowerCase()} strategy for ${templateName}.`;

  // Sort available opportunities by APY descending
  const sortedOpportunities = [...availableOpportunities].sort((a, b) => b.apy - a.apy);

  if (riskLevel === RiskLevel.AGGRESSIVE) {
    // Aggressive: average of 3rd, 4th, 5th highest APY
    // Ensure we have enough opportunities, otherwise adjust
    const indices = [2, 3, 4]; // 0-indexed for 3rd, 4th, 5th
    for (const index of indices) {
      if (sortedOpportunities[index]) {
        opportunityAPYs.push(sortedOpportunities[index].apy);
        opportunityNames.push(`${sortedOpportunities[index].platform} - ${sortedOpportunities[index].name}`);
      } else if (sortedOpportunities.length > 0 && index >= sortedOpportunities.length) {
        // If not enough, use the last available one (least APY among available)
        const lastAvailable = sortedOpportunities[sortedOpportunities.length -1];
        opportunityAPYs.push(lastAvailable.apy);
        opportunityNames.push(`${lastAvailable.platform} - ${lastAvailable.name}`);
      }
    }
    description = `Aggressive strategy: Average of APYs from ${opportunityNames.join(', ') || 'available sources'}.`;

  } else if (riskLevel === RiskLevel.NORMAL) {
    // Normal: average of 8th, 9th, 10th highest APY
    // Adjust if an opportunity is opted out, use the next available one
    // This logic is simplified: we use the 8th, 9th, 10th of the *filtered* list.
    const indices = [7, 8, 9]; // 0-indexed for 8th, 9th, 10th
    for (const index of indices) {
      if (sortedOpportunities[index]) {
        opportunityAPYs.push(sortedOpportunities[index].apy);
        opportunityNames.push(`${sortedOpportunities[index].platform} - ${sortedOpportunities[index].name}`);
      } else if (sortedOpportunities.length > 0 && index >= sortedOpportunities.length) {
         // If not enough, use the last available one
        const lastAvailable = sortedOpportunities[sortedOpportunities.length -1];
        opportunityAPYs.push(lastAvailable.apy);
        opportunityNames.push(`${lastAvailable.platform} - ${lastAvailable.name}`);
      }
    }
    description = `Normal strategy: Average of APYs from ${opportunityNames.join(', ') || 'available sources'}.`;
  }

  const totalApy = opportunityAPYs.reduce((sum, apy) => sum + apy, 0);
  const finalApy = opportunityAPYs.length > 0 ? totalApy / opportunityAPYs.length : 0;
  
  return {
    apy: finalApy,
    sources: opportunityNames.length > 0 ? opportunityNames : ['No suitable yield opportunities available'],
    description: opportunityNames.length > 0 ? description : `No suitable yield opportunities available for ${templateName} ${riskLevel.toLowerCase()} strategy.`
  };
};

export const strategyRouter = createTRPCRouter({
  getAllWithPreferences: publicProcedure
    .input(
      z.object({}).optional()
    )
    .query(async ({ ctx }) => {
      const strategyTemplates = await prisma.strategyTemplate.findMany({
        include: {
          yieldOpportunities: true, // Include linked yield opportunities
        },
      });

      let userOptedOutOpportunityIds: Set<string> = new Set();
      let userPreferencesMap = new Map();
      let userAllocationsMap = new Map();

      if (ctx.user?.id) {
        const userId = ctx.user.id;
        const [userOptOuts, userPreferences, userAllocations] = await Promise.all([
          prisma.userYieldOpportunityOptOut.findMany({
            where: { userId },
            select: { yieldOpportunityId: true },
          }),
          prisma.userStrategyPreference.findMany({
            where: { userId },
            select: {
              strategyTemplateId: true,
              isFavorite: true,
              isHidden: true,
              receiveNotifications: true,
            },
          }),
          prisma.userStrategyAllocation.findMany({
            where: { userId },
            select: {
              strategyTemplateId: true,
              allocatedAmount: true,
              cumulativeYieldEarned: true,
            },
          }),
        ]);

        userOptedOutOpportunityIds = new Set(userOptOuts.map(optOut => optOut.yieldOpportunityId));

        userPreferencesMap = new Map(
          userPreferences.map(p => [
            p.strategyTemplateId,
            { 
              isFavorite: p.isFavorite, 
              isHidden: p.isHidden, 
              receiveNotifications: p.receiveNotifications 
            },
          ])
        );
        userAllocationsMap = new Map(
          userAllocations.map(a => [
            a.strategyTemplateId,
            {
              allocatedAmount: a.allocatedAmount,
              cumulativeYieldEarned: a.cumulativeYieldEarned,
            },
          ])
        );
      } else {
      }

      return strategyTemplates.map(template => {
        if (template.name === "Solana Strategy Aggressive") {
        }
        
        const availableOpportunities = template.yieldOpportunities.filter(
          op => !userOptedOutOpportunityIds.has(op.id)
        );

        if (template.name === "Solana Strategy Aggressive") {
        }

        const { apy, sources, description } = calculateStrategyDetails(
          template.name, 
          template.riskLevel,
          availableOpportunities
        );
        
        const historicalKey = getHistoricalDataKey(template);
        const historicalData = historicalKey ? allHistoricalData[historicalKey] || [] : [];

        if (template.name === "Solana Strategy Aggressive" && sources.some(s => s.toLowerCase().includes('sanctum'))) {
        }

        return {
          ...template,
          apy: apy,
          sources: sources,
          description: description, // Overwrite template description with dynamic one
          preferences: userPreferencesMap.get(template.id) || {
            isFavorite: false,
            isHidden: false,
            receiveNotifications: false,
          },
          allocation: userAllocationsMap.get(template.id) || {
            allocatedAmount: 0,
            cumulativeYieldEarned: 0,
          },
          historicalData: historicalData, // Add historical data
          // Remove the direct yieldOpportunities from the final output to client if not needed
          // yieldOpportunities: undefined, 
        };
      });
    }),

  setPreference: protectedProcedure
    .input(
      z.object({
        strategyTemplateId: z.string(), // Changed from strategyId
        isFavorite: z.boolean().optional(),
        isHidden: z.boolean().optional(),
        receiveNotifications: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { strategyTemplateId, ...preferenceValues } = input;
      const strategyTemplate = await prisma.strategyTemplate.findUnique({
        where: { id: strategyTemplateId },
      });
      if (!strategyTemplate) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Strategy Template with ID '${strategyTemplateId}' not found.`,
        });
      }
      const userId = ctx.user.id;
      const existingPreference = await prisma.userStrategyPreference.findUnique({
        where: {
          userId_strategyTemplateId: { // Changed from userId_strategyId
            userId,
            strategyTemplateId,
          },
        },
      });
      if (existingPreference) {
        const dataToUpdate: Partial<typeof preferenceValues> = {};
        if (preferenceValues.isFavorite !== undefined) dataToUpdate.isFavorite = preferenceValues.isFavorite;
        if (preferenceValues.isHidden !== undefined) dataToUpdate.isHidden = preferenceValues.isHidden;
        if (preferenceValues.receiveNotifications !== undefined) dataToUpdate.receiveNotifications = preferenceValues.receiveNotifications;
        if (Object.keys(dataToUpdate).length === 0) {
          return existingPreference;
        }
        return prisma.userStrategyPreference.update({
          where: {
            userId_strategyTemplateId: { // Changed from userId_strategyId
              userId,
              strategyTemplateId,
            },
          },
          data: dataToUpdate,
        });
      } else {
        return prisma.userStrategyPreference.create({
          data: {
            userId,
            strategyTemplateId, // Changed from strategyId
            isFavorite: preferenceValues.isFavorite ?? false,
            isHidden: preferenceValues.isHidden ?? false,
            receiveNotifications: preferenceValues.receiveNotifications ?? false,
          },
        });
      }
    }),
}); 