import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { appRouter } from '@/server/routers/_app';
import { createTRPCContext } from '@/server/api/trpc';   

/**
 * API handler for tRPC requests in the Next.js App Router.
 * @see https://trpc.io/docs/server/adapters/fetch
 */
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({req, headers: req.headers}), // Pass the NextRequest to createContext
    onError: ({ error, path, type, ctx, input }) => {
      console.error(
        `tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
        {
          error,
          type,
          ctx,
          input,
        }
      );
      // You can add more sophisticated error logging here, e.g., send to Sentry
    },
  });

export { handler as GET, handler as POST }; 