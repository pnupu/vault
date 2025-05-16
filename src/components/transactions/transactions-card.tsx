"use client";

import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // For Load More button
import { trpc } from "@/lib/trpc";
import { TradingHistory, StrategyTemplate } from "@/generated/prisma"; // Import generated types

// Define a type for the items returned by the API, including the nested strategyTemplate name
interface TransactionItem extends Omit<TradingHistory, 'strategyTemplateId' | 'price'> {
  price?: number | null; // Making price explicitly possibly null as it is in schema
  strategyTemplate?: {
    name: string;
  } | null;
  // Add status if we decide how to determine it later. For now, we assume COMPLETED.
}

function getActionBadgeVariant(action: TransactionItem['action']) {
  // Simplified badge variants based on action type for visual distinction
  if (action.includes('DEPOSIT') || action.includes('BUY') || action.includes('CLAIM')) return 'success';
  if (action.includes('WITHDRAW') || action.includes('SELL')) return 'destructive';
  if (action.includes('ALLOCATE') || action.includes('DEALLOCATE')) return 'default';
  return 'outline';
}

export function TransactionsCard() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = trpc.transaction.getAllForUser.useInfiniteQuery(
    { limit: 10 }, // Fetch 10 items per page
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // refetchOnWindowFocus: false, // Optional: configure query behavior
    }
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading transactions...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading transactions: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  const transactions = data?.pages.flatMap(page => page.items as TransactionItem[]) ?? [];

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No transactions found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your recent account activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  <Badge variant={getActionBadgeVariant(tx.action) as any} className="capitalize">
                    {tx.action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </TableCell>
                <TableCell>{tx.asset}</TableCell>
                <TableCell className="text-right">
                  {tx.amount.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: (tx.asset ==='USDC' || tx.asset === 'USDT' || tx.asset === 'USD') ? 2 : 8 
                  })}
                </TableCell>
                <TableCell>{new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString()}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {tx.strategyTemplate?.name || (tx.price ? `Price: $${tx.price.toFixed(2)}` : 'N/A')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {hasNextPage && (
          <div className="pt-4 text-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load More'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 