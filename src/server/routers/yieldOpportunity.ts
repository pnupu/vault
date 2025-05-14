import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@/server/api/trpc';
import { prisma } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';

export const yieldOpportunityRouter = createTRPCRouter({
  getAllWithOptOutStatus: publicProcedure
    .input(z.object({}).optional()) // No specific input for now, fetches all
    .query(async ({ ctx }) => {
      const opportunities = await prisma.yieldOpportunity.findMany({});

      if (!ctx.user?.id) {
        // No user logged in, return opportunities with isOptedOut as false
        return opportunities.map(op => ({
          ...op,
          isOptedOut: false,
        }));
      }

      // User is logged in, fetch their opt-outs
      const userOptOuts = await prisma.userYieldOpportunityOptOut.findMany({
        where: { userId: ctx.user.id },
        select: { yieldOpportunityId: true },
      });

      const optedOutIds = new Set(userOptOuts.map(optOut => optOut.yieldOpportunityId));

      return opportunities.map(op => ({
        ...op,
        isOptedOut: optedOutIds.has(op.id),
      }));
    }),

  setOptOut: protectedProcedure
    .input(
      z.object({
        yieldOpportunityId: z.string(),
        optedOut: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { yieldOpportunityId, optedOut } = input;
      const userId = ctx.user.id; // User is guaranteed by protectedProcedure

      // Check if the yield opportunity exists
      const opportunity = await prisma.yieldOpportunity.findUnique({
        where: { id: yieldOpportunityId },
      });

      if (!opportunity) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Yield opportunity with ID '${yieldOpportunityId}' not found.`,
        });
      }

      if (optedOut) {
        // User wants to opt-out: create a record if it doesn't exist
        // Use upsert to handle cases where the opt-out might already exist (e.g., due to a race condition or previous attempt)
        return prisma.userYieldOpportunityOptOut.upsert({
          where: {
            userId_yieldOpportunityId: {
              userId,
              yieldOpportunityId,
            },
          },
          create: {
            userId,
            yieldOpportunityId,
          },
          update: {}, // No fields to update if it already exists, just ensure it's there
        });
      } else {
        // User wants to opt-in (i.e., remove the opt-out record)
        // We can use deleteMany here which won't throw if the record doesn't exist.
        await prisma.userYieldOpportunityOptOut.deleteMany({
          where: {
            userId,
            yieldOpportunityId,
          },
        });
        // Return a success indication, reflecting the desired state
        return { success: true, yieldOpportunityId, optedOut: false };
      }
    }),
}); 