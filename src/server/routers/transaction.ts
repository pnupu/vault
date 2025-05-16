import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';
import { prisma } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';
// We might need Connection and PublicKey from @solana/web3.js for transaction verification
// import { Connection, PublicKey } from '@solana/web3.js';

// Placeholder for a function to verify a Solana transaction
// In a real app, this would involve using Connection.getTransaction(signature)
// and then parsing the transaction details to ensure it matches expectations.
async function verifySolanaTransaction(
  signature: string, 
  expectedAmountLamports?: bigint, 
  expectedRecipient?: string, 
  expectedSender?: string
): Promise<boolean> {

  // For now, assume valid if signature is present
  // Replace with actual on-chain verification logic
  return !!signature;
}

export const transactionRouter = createTRPCRouter({
  getAllForUser: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).optional().default(20),
        cursor: z.string().nullish(), // for pagination
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const userId = ctx.user.id;

      const items = await prisma.tradingHistory.findMany({
        take: limit + 1, // get an extra item to see if there's a next page
        where: {
          userId,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          timestamp: 'desc',
        },
        include: {
          strategyTemplate: {
            select: {
              name: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // remove the extra item
        nextCursor = nextItem!.id; // set the cursor to the id of the removed item
      }

      return {
        items,
        nextCursor,
      };
    }),

  recordDepositSol: protectedProcedure
    .input(z.object({
      amountSol: z.number().positive(), // Amount in SOL
      transactionSignature: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const isVerified = await verifySolanaTransaction(input.transactionSignature, BigInt(Math.floor(input.amountSol * 1_000_000_000)), /* vault PDA */ undefined, ctx.user.walletAddress);
      if (!isVerified) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'SOL deposit transaction verification failed or transaction invalid.' });
      }

      return prisma.tradingHistory.create({
        data: {
          userId: ctx.user.id,
          action: "DEPOSIT_SOL",
          asset: "SOL",
          amount: input.amountSol,
        },
      });
    }),

  recordWithdrawSol: protectedProcedure
    .input(z.object({
      amountSol: z.number().positive(),
      transactionSignature: z.string(), 
    }))
    .mutation(async ({ ctx, input }) => {
      const isVerified = await verifySolanaTransaction(input.transactionSignature, BigInt(Math.floor(input.amountSol * 1_000_000_000)), ctx.user.walletAddress /* recipient */, /* vault PDA */ undefined);
      if (!isVerified) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'SOL withdrawal transaction verification failed or transaction invalid.' });
      }
      return prisma.tradingHistory.create({
        data: {
          userId: ctx.user.id,
          action: "WITHDRAW_SOL",
          asset: "SOL",
          amount: input.amountSol,
        },
      });
    }),

  recordDepositToken: protectedProcedure
    .input(z.object({
      amountUi: z.number().positive(), // UI amount (e.g., 10.5 USDC)
      tokenMint: z.string(), 
      tokenSymbol: z.string(), 
      tokenDecimals: z.number().int().positive(),
      transactionSignature: z.string(), 
    }))
    .mutation(async ({ ctx, input }) => {
      const amountLamports = BigInt(Math.floor(input.amountUi * Math.pow(10, input.tokenDecimals)));
      const isVerified = await verifySolanaTransaction(input.transactionSignature, amountLamports, /* vault token PDA */ undefined, /* user token ATA */ undefined);
      if (!isVerified) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Token deposit transaction verification failed or transaction invalid.' });
      }
      return prisma.tradingHistory.create({
        data: {
          userId: ctx.user.id,
          action: `DEPOSIT_TOKEN`, 
          asset: input.tokenSymbol,
          amount: input.amountUi,
        },
      });
    }),

  recordWithdrawToken: protectedProcedure
    .input(z.object({
      amountUi: z.number().positive(),
      tokenMint: z.string(),
      tokenSymbol: z.string(),
      tokenDecimals: z.number().int().positive(),
      transactionSignature: z.string(), 
    }))
    .mutation(async ({ ctx, input }) => {
      const amountLamports = BigInt(Math.floor(input.amountUi * Math.pow(10, input.tokenDecimals)));
      const isVerified = await verifySolanaTransaction(input.transactionSignature, amountLamports, /* user token ATA */ undefined, /* vault token PDA */ undefined);
       if (!isVerified) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Token withdrawal transaction verification failed or transaction invalid.' });
      }
      return prisma.tradingHistory.create({
        data: {
          userId: ctx.user.id,
          action: `WITHDRAW_TOKEN`,
          asset: input.tokenSymbol,
          amount: input.amountUi,
        },
      });
    }),
  
  recordWithdrawalRequest: protectedProcedure
    .input(z.object({
      amount: z.number().positive(),
      asset: z.string(), // "SOL" or token symbol like "USDC"
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Handle actual withdrawal request logic (e.g., queueing, admin approval)
      // For now, just record the request in history.
      return prisma.tradingHistory.create({
        data: {
          userId: ctx.user.id,
          action: `REQUEST_WITHDRAWAL_${input.asset.toUpperCase()}`,
          asset: input.asset,
          amount: input.amount,
          // Consider adding a status field to TradingHistory later for PENDING requests
        },
      });
    }),
}); 