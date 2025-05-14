import {  createTRPCRouter } from '@/server/api/trpc';
import { userRouter } from './user';
import { adminRouter } from './admin';
import { strategyRouter } from './strategy';
import { yieldOpportunityRouter } from './yieldOpportunity';

export const appRouter = createTRPCRouter({
  user: userRouter,
  admin: adminRouter,
  strategy: strategyRouter,
  yieldOpportunity: yieldOpportunityRouter,
});

export type AppRouter = typeof appRouter; 
