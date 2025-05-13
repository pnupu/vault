import { initTRPC } from '@trpc/server';
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
    console.log("Attempting to verify JWT from Authorization header:", token.substring(0, 20) + "...");
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedJwtPayload;
      console.log("JWT Decoded successfully:", decoded);
      // Fetch user from DB based on walletAddress or userId from token
      // Using walletAddress for consistency with previous logic, but userId is also good
      if (decoded && decoded.walletAddress) {
        user = await prisma.user.findUnique({ where: { walletAddress: decoded.walletAddress } });
        if (user) {
          console.log("User context set from JWT for:", user.walletAddress);
        } else {
          console.warn("User not found for walletAddress in JWT:", decoded.walletAddress);
        }
      } else if (decoded && decoded.userId) {
        // Fallback or primary lookup by userId if preferred
        user = await prisma.user.findUnique({ where: { id: decoded.userId } });
         if (user) {
          console.log("User context set from JWT (using userId) for:", user.id);
        } else {
          console.warn("User not found for userId in JWT:", decoded.userId);
        }
      }
    } catch (error) {
      console.warn("JWT verification failed:", (error as Error).message);
      // If token is invalid (e.g., expired, malformed, wrong secret), user remains null
    }
  } else {
    console.log("No Authorization Bearer token found in headers.");
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
