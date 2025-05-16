"use client";

import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, StarIcon, EyeOffIcon } from "lucide-react";
import { User, UserStrategyPreference, UserYieldOpportunityOptOut, StrategyTemplate, YieldOpportunity } from "@/generated/prisma"; // For type hint

// Define the extended User type based on the backend includes
interface UserWithDetails extends User {
  strategyPreferences: (UserStrategyPreference & { StrategyTemplate: Pick<StrategyTemplate, 'name'> })[];
  yieldOpportunityOptOuts: (UserYieldOpportunityOptOut & { yieldOpportunity: Pick<YieldOpportunity, 'name' | 'platform' | 'marketId'> })[];
}

export function AdminUserList() {
  const { data: usersData, isLoading, error } = trpc.admin.getAllUsers.useQuery();

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading users: {error.message}</p>;
  }

  const users = usersData as UserWithDetails[] | undefined;

  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage all registered users and their key preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-xs truncate" title={user.id}>{user.id}</TableCell>
                <TableCell className="truncate" title={user.walletAddress}>{user.walletAddress}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuLabel className="font-semibold">User Details</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center">
                        <StarIcon className="w-3 h-3 mr-1.5 text-yellow-500" /> Favorite Strategies
                      </DropdownMenuLabel>
                      {user.strategyPreferences && user.strategyPreferences.length > 0 ? (
                        user.strategyPreferences.map(pref => (
                          <DropdownMenuItem key={pref.strategyTemplateId} className="text-xs pl-5">
                            {pref.StrategyTemplate?.name}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled className="text-xs pl-5 italic">None</DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center">
                         <EyeOffIcon className="w-3 h-3 mr-1.5 text-gray-500" /> Opted-Out Yields
                      </DropdownMenuLabel>
                      {user.yieldOpportunityOptOuts && user.yieldOpportunityOptOuts.length > 0 ? (
                        user.yieldOpportunityOptOuts.map(optOut => (
                          <DropdownMenuItem key={optOut.yieldOpportunityId} className="text-xs pl-5">
                            {optOut.yieldOpportunity.name} ({optOut.yieldOpportunity.platform} - {optOut.yieldOpportunity.marketId})
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled className="text-xs pl-5 italic">None</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 