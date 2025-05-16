'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { trpc } from '../lib/trpc'; // Import the trpc instance
import superjson from 'superjson'; // Import superjson

// Key for storing the JWT in localStorage. Should match the one in solanaProvider.tsx
const SOLANA_VAULT_JWT_KEY = 'solana_vault_jwt_token';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: '/api/trpc', // Endpoint for the tRPC API route
          transformer: superjson, // Transformer correctly placed here
          async headers() {
            // Remove old x-wallet-address logic
            // const walletAddress = typeof window !== 'undefined' ? localStorage.getItem('walletAddress') : null;
            // console.log("walletAddress from TrpcProvider (old logic):", walletAddress);

            // Send JWT if available
            if (typeof window !== 'undefined') {
              const token = localStorage.getItem(SOLANA_VAULT_JWT_KEY);
              if (token) {
                return {
                  Authorization: `Bearer ${token}`,
                };
              }
            }
            return {}; // Return empty object if no token or not in browser
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
} 