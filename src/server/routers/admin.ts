import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '@/server/api/trpc';
import { UserRole } from '@/generated/prisma';

export const adminRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        strategyPreferences: {
          where: { isFavorite: true }, // Only favorite strategies
          include: {
            strategyTemplate: { // Include the strategy details
              select: {
                name: true,
              },
            },
          },
        },
        yieldOpportunityOptOuts: {
          include: {
            yieldOpportunity: { // Include yield opportunity details
              select: {
                name: true,
                platform: true,
                marketId: true, 
              },
            },
          },
        },
      },
    });
  }),

  setUserRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.nativeEnum(UserRole),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, role } = input;
      return ctx.prisma.user.update({
        where: { id: userId },
        data: { role },
      });
    }),
}); 