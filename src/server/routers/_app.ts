import {  createTRPCRouter } from '@/server/api/trpc';
import { userRouter } from './user';
import { adminRouter } from './admin';

export const appRouter = createTRPCRouter({
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter; 
