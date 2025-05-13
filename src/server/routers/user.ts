import { z } from 'zod';
import { publicProcedure, router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { UserRole } from '../../generated/prisma';
import crypto from 'crypto';
import nacl from 'tweetnacl';
import jwt from 'jsonwebtoken';
import bs58 from 'bs58';

// IMPORTANT: Store this in an environment variable in production!
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-and-long-jwt-secret-key'; 
if (JWT_SECRET === 'your-super-secret-and-long-jwt-secret-key') {
  console.warn("WARNING: Using default JWT_SECRET. Please set a strong secret in your environment variables.");
}

export const userRouter = router({
  requestLoginChallenge: publicProcedure
    .input(z.object({ walletAddress: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const nonce = crypto.randomBytes(32).toString('hex');
      // TODO: Store this nonce server-side (e.g., in Redis or a DB table)
      // with an expiry and associate it with input.walletAddress to prevent reuse.
      console.log(`Generated nonce for ${input.walletAddress}: ${nonce}`);
      return { nonce };
    }),

  verifySignatureAndLogin: publicProcedure
    .input(
      z.object({
        walletAddress: z.string(),
        nonce: z.string(),
        signature: z.string(), // Base64 encoded signature
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { walletAddress, nonce, signature } = input;

      try {
        const messageBytes = new TextEncoder().encode(nonce);
        const publicKeyBytes = bs58.decode(walletAddress);
        const signatureBytes = Buffer.from(signature, 'base64');

        const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);

        if (!isValid) {
          // TODO: Implement proper nonce verification here:
          // 1. Check if the nonce was actually issued by the server for this walletAddress.
          // 2. Check if the nonce has expired.
          // 3. Check if the nonce has already been used. If so, reject.
          // 4. If valid and used, mark as used.
          console.error("Signature verification failed for address:", walletAddress);
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid signature or nonce.' });
        }
        
        console.log("Signature verified successfully for address:", walletAddress);

        // If signature is valid, find or create user
        let user = await ctx.prisma.user.findUnique({
          where: { walletAddress },
        });

        if (!user) {
          user = await ctx.prisma.user.create({
            data: {
              walletAddress,
              role: UserRole.USER, 
            },
          });
        }

        // Generate JWT
        const token = jwt.sign(
          { userId: user.id, walletAddress: user.walletAddress, role: user.role },
          JWT_SECRET,
          { expiresIn: '7d' } // Token expiry (e.g., 7 days)
        );

        return {
          token,
          user: {
            id: user.id,
            walletAddress: user.walletAddress,
            role: user.role,
          },
        };
      } catch (error) {
        console.error("Error during signature verification or login:", error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred.' });
      }
    }),

  connectUser: publicProcedure
    .input(
      z.object({
        walletAddress: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { walletAddress } = input;
      let user = await ctx.prisma.user.findUnique({
        where: { walletAddress },
      });

      if (!user) {
        user = await ctx.prisma.user.create({
          data: {
            walletAddress,
            role: UserRole.USER,
          },
        });
      }
      return user;
    }),

  getMe: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  getMyData: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const userWithData = await ctx.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tradingHistory: true,
        currentAllocations: true,
        currentAssets: true,
        userStrategyAllocations: {
          include: {
            strategy: true, // Also include details of the strategy they are allocated to
          },
        },
      },
    });
    return userWithData;
  }),

  // Example of a procedure to update user's own data
  // updateMyPreferences: protectedProcedure
  //   .input(z.object({ /* ... your preference fields ... */ }))
  //   .mutation(async ({ ctx, input }) => {
  //     const updatedUser = await ctx.prisma.user.update({
  //       where: { id: ctx.user.id }, // Ensures user can only update their own record
  //       data: { /* ... input data ... */ },
  //     });
  //     return updatedUser;
  //   }),
}); 