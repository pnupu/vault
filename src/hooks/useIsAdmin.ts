"use client";

import { trpc } from "@/lib/trpc";
import { UserRole } from "@/generated/prisma"; // Import UserRole for type safety

export function useIsAdmin() {
  const { data: user, isLoading, error } = trpc.user.getMe.useQuery(
    undefined,
    {
      // We can make this query more resilient if needed:
      // retry: false, // Don't retry on error for auth-like checks
      // refetchOnWindowFocus: false, // Avoid unnecessary refetches
      // staleTime: 5 * 60 * 1000, // Consider user role fairly stable (5 mins)
    }
  );

  // If there's an error fetching the user (e.g., not logged in, token invalid),
  // they are not an admin.
  if (error) {
    return { isAdmin: false, isLoading: false };
  }

  // If still loading, reflect that.
  if (isLoading) {
    return { isAdmin: false, isLoading: true };
  }

  // If data is available, check the role.
  // The user object from ctx.user in a protectedProcedure is guaranteed to be non-null if no error thrown.
  const isAdmin = user?.role === UserRole.ADMIN;

  return { isAdmin, isLoading: false };
} 