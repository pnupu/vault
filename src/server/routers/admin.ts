import { z } from 'zod';
import { adminProcedure, router } from '../trpc';
import { UserRole } from '../../generated/prisma'; // Import UserRole enum

export const adminRouter = router({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  setUserRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.nativeEnum(UserRole), // Use nativeEnum for Prisma enums
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