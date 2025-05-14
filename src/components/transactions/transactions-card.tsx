"use client";

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

// Mock transaction data type
interface MockTransaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'BUY' | 'SELL' | 'ALLOCATE' | 'DEALLOCATE' | 'CLAIM_YIELD';
  asset: string;
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  timestamp: Date;
  details?: string; // e.g., strategy name for ALLOCATE/DEALLOCATE
}

const mockTransactions: MockTransaction[] = [
  {
    id: "txn_1",
    type: "DEPOSIT",
    asset: "USDC",
    amount: 1000,
    status: "COMPLETED",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "txn_2",
    type: "ALLOCATE",
    asset: "USDC",
    amount: 500,
    status: "COMPLETED",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    details: "Conservative USDC Lending"
  },
  {
    id: "txn_3",
    type: "BUY",
    asset: "SOL",
    amount: 10,
    status: "COMPLETED",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "txn_4",
    type: "CLAIM_YIELD",
    asset: "USDC",
    amount: 5.25,
    status: "COMPLETED",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    details: "Conservative USDC Lending"
  },
  {
    id: "txn_5",
    type: "WITHDRAW",
    asset: "SOL",
    amount: 2,
    status: "PENDING",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
];

function getStatusBadgeVariant(status: MockTransaction['status']) {
  switch (status) {
    case 'COMPLETED': return 'success';
    case 'PENDING': return 'secondary';
    case 'FAILED': return 'destructive';
    default: return 'outline';
  }
}

export function TransactionsCard() {
  // TODO: Later, fetch real transactions using tRPC
  // For now, using mock data

  if (mockTransactions.length === 0) {
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
              <TableHead>Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</TableCell>
                <TableCell>{tx.asset}</TableCell>
                <TableCell className="text-right">{tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: tx.asset ==='USDC' || tx.asset === 'USDT' ? 2 : 8})}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(tx.status) as any} className="capitalize">
                    {tx.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>{tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{tx.details || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 