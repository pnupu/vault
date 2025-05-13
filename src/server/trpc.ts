/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
import { initTRPC, TRPCError } from '@trpc/server';
// import type * as trpcNext from '@trpc/server/adapters/next'; // For Pages Router context
import { prisma } from '../lib/prisma';
import { User } from '../generated/prisma';
import superjson from 'superjson';
import { NextRequest } from 'next/server'; // For App Router context
import { IncomingMessage } from 'http'; // For general Node.js http context (like Pages Router)

// Define a more flexible options type for createContext
interface CreateContextOptionsBase {
  // Add any other properties you might pass, e.g., res for Pages Router
}

interface CreateAppRouterContextOptions extends CreateContextOptionsBase {
  req: NextRequest;
}

interface CreatePagesRouterContextOptions extends CreateContextOptionsBase {
  req: IncomingMessage; // Or trpcNext.CreateNextContextOptions['req']
  res?: any; // Or trpcNext.CreateNextContextOptions['res']
}

type AnyCreateContextOptions = CreateAppRouterContextOptions | CreatePagesRouterContextOptions;

/**
 * Creates a tRPC context with the Prisma client and potentially an authenticated user.
 */
export const createContext = async (opts: AnyCreateContextOptions) => {
  const req = opts?.req;
  let walletAddress: string | null | undefined = null;

  if (req instanceof NextRequest) {
    // App Router: Access headers from NextRequest
    walletAddress = req.headers.get('x-wallet-address');
  } else if (req) {
    // Pages Router / other Node.js: Access headers from IncomingMessage
    walletAddress = (req.headers as any)['x-wallet-address'];
  }

  let user: User | null = null;
  if (walletAddress) {
    user = await prisma.user.findUnique({ where: { walletAddress } });
  }

  return {
    prisma,
    user,
    req, // Optionally pass the request object if needed by procedures
    // res: opts && 'res' in opts ? opts.res : undefined, // Pass res if it exists (for Pages Router)
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC with superjson transformer
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Middleware to check if the user is authenticated.
 */
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

/**
 * Protected procedure (requires user to be authenticated)
 */
export const protectedProcedure = t.procedure.use(isAuthenticated);

/**
 * Middleware to check if the authenticated user is an admin.
 */
const isAdmin = isAuthenticated.unstable_pipe(({ ctx, next }) => {
  if (ctx.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Requires admin privileges' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

/**
 * Admin procedure (requires user to be an authenticated admin)
 */
export const adminProcedure = t.procedure.use(isAdmin); 