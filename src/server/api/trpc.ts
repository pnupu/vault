import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { User } from '@/generated/prisma';
import jwt from 'jsonwebtoken';

// IMPORTANT: Store this in an environment variable in production!
// This should be the same secret used in the userRouter.ts
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-and-long-jwt-secret-key'; 
if (JWT_SECRET === 'your-super-secret-and-long-jwt-secret-key') {
  // Check if already warned to avoid duplicate logs if files are processed multiple times by dev server
  if (!(global as any).__JWT_SECRET_WARNED__) {
    console.warn("WARNING: Using default JWT_SECRET in trpc.ts. Please set a strong secret in your environment variables.");
    (global as any).__JWT_SECRET_WARNED__ = true;
  }
}

export const createStaticContext = () => {
  return {
    prisma,
  };
};

interface DecodedJwtPayload {
  userId: string;
  walletAddress: string;
  role: string; 
  // Add other fields if you include them in the JWT payload
  iat: number;
  exp: number;
}

export const createTRPCContext = async (opts: {
  headers: Headers;
  req?: NextRequest;
}) => {
  const req = opts.req;
  let user: User | null = null;

  const authHeader = opts.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedJwtPayload;
      // Fetch user from DB based on walletAddress or userId from token
      // Using walletAddress for consistency with previous logic, but userId is also good
      if (decoded && decoded.walletAddress) {
        user = await prisma.user.findUnique({ where: { walletAddress: decoded.walletAddress } });
        if (user) {
        } else {
          console.warn("User not found for walletAddress in JWT:", decoded.walletAddress);
        }
      } else if (decoded && decoded.userId) {
        // Fallback or primary lookup by userId if preferred
        user = await prisma.user.findUnique({ where: { id: decoded.userId } });
         if (user) {
        } else {
          console.warn("User not found for userId in JWT:", decoded.userId);
        }
      }
    } catch (error) {
      console.warn("JWT verification failed:", (error as Error).message);
      // If token is invalid (e.g., expired, malformed, wrong secret), user remains null
    }
  } else {
  }

  // Remove old x-wallet-address logic
  // const extractedAddress = opts.headers.get('x-wallet-address'); 
  // ... (old logic was here)

  return {
    ...createStaticContext(),
    headers: opts.headers,
    req,
    user, // user will be populated if JWT is valid, otherwise null
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const trpcMiddleware = t.middleware;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the procedure.
 * @link https://trpc.io/docs/server/middlewares
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      // infers the `user` as non-nullable
      user: { ...ctx.user, id: ctx.user.id },
    },
  });
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.user` is not null.
 *
 * @link https://trpc.io/docs/server/middlewares
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

/**
 * Middleware to check if the authenticated user is an admin.
 * It first ensures the user is authenticated, then checks their role.
 */
const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  // User must be authenticated first
  if (!ctx.user || !ctx.user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not authenticated.' });
  }
  // Then, check if the authenticated user is an ADMIN
  if (ctx.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Requires admin privileges.' });
  }
  return next({
    ctx: {
      // `user` is already confirmed to be non-null and is an ADMIN
      user: ctx.user, 
    },
  });
});

/**
 * Admin procedure (requires user to be an authenticated admin)
 *
 * If you want a query or mutation to ONLY be accessible to logged in admin users, use this.
 * It verifies the session is valid, the user is present, and the user has an ADMIN role.
 */
export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
