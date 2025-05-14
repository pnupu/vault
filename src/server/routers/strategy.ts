import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc';
import { prisma } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';

export const strategyRouter = createTRPCRouter({
  getAllWithPreferences: publicProcedure
    .input(
      z.object({}).optional()
    )
    .query(async ({ ctx }) => {
      const strategies = await prisma.strategy.findMany({});

      if (!ctx.user?.id) {
        // No user logged in, return strategies with default preferences and no allocation info
        return strategies.map(strategy => ({
          ...strategy,
          preferences: {
            isFavorite: false,
            isHidden: false,
            receiveNotifications: false,
          },
          allocation: {
            allocatedAmount: 0,
            cumulativeYieldEarned: 0,
          },
        }));
      }

      // User is logged in, fetch their preferences and allocations
      const userId = ctx.user.id;

      const [userPreferences, userAllocations] = await Promise.all([
        prisma.userStrategyPreference.findMany({
          where: { userId },
          select: {
            strategyId: true,
            isFavorite: true,
            isHidden: true,
            receiveNotifications: true,
          },
        }),
        prisma.userStrategyAllocation.findMany({
          where: { userId },
          select: {
            strategyId: true,
            allocatedAmount: true,
            cumulativeYieldEarned: true,
          },
        }),
      ]);

      const preferencesMap = new Map(
        userPreferences.map(p => [
          p.strategyId,
          { 
            isFavorite: p.isFavorite, 
            isHidden: p.isHidden, 
            receiveNotifications: p.receiveNotifications 
          },
        ])
      );

      const allocationsMap = new Map(
        userAllocations.map(a => [
          a.strategyId,
          {
            allocatedAmount: a.allocatedAmount,
            cumulativeYieldEarned: a.cumulativeYieldEarned,
          },
        ])
      );

      return strategies.map(strategy => ({
        ...strategy,
        preferences: preferencesMap.get(strategy.id) || {
          isFavorite: false,
          isHidden: false,
          receiveNotifications: false,
        },
        allocation: allocationsMap.get(strategy.id) || {
          allocatedAmount: 0,
          cumulativeYieldEarned: 0,
        },
      }));
    }),

  setPreference: protectedProcedure
    .input(
      z.object({
        strategyId: z.string(),
        isFavorite: z.boolean().optional(),
        isHidden: z.boolean().optional(),
        receiveNotifications: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { strategyId, ...preferenceValues } = input;
      const strategy = await prisma.strategy.findUnique({
        where: { id: strategyId },
      });
      if (!strategy) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Strategy with ID '${strategyId}' not found.`,
        });
      }
      const userId = ctx.user.id;
      const existingPreference = await prisma.userStrategyPreference.findUnique({
        where: {
          userId_strategyId: {
            userId,
            strategyId,
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
            userId_strategyId: {
              userId,
              strategyId,
            },
          },
          data: dataToUpdate,
        });
      } else {
        return prisma.userStrategyPreference.create({
          data: {
            userId,
            strategyId,
            isFavorite: preferenceValues.isFavorite ?? false,
            isHidden: preferenceValues.isHidden ?? false,
            receiveNotifications: preferenceValues.receiveNotifications ?? false,
          },
        });
      }
    }),
}); 