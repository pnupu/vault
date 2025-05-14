"use client";

import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StarIcon, BriefcaseIcon, TrendingUpIcon } from "lucide-react"; // Example icons
import { Strategy } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";

// Define the expected shape of the data from the hook
interface StrategyWithDetails extends Strategy {
  preferences: {
    isFavorite: boolean;
    isHidden: boolean;
    receiveNotifications: boolean;
  };
  allocation: {
    allocatedAmount: number;
    cumulativeYieldEarned: number;
  };
}

export function InvestmentCard() {
  const { 
    data: strategiesData,
    isLoading,
    error,
    refetch // In case we add actions like deposit/withdraw later
  } = trpc.strategy.getAllWithPreferences.useQuery(undefined, {
    // refetchOnWindowFocus: false, // Consider for UX
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading your investment details...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading investments: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  const visibleStrategies = strategiesData?.filter(
    (s) => !(s as StrategyWithDetails).preferences.isHidden
  ) as StrategyWithDetails[] | undefined;

  if (!visibleStrategies || visibleStrategies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No active strategies to display. Explore strategies and start investing!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {visibleStrategies.map((strategy) => (
        <Card key={strategy.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between pb-2 bg-muted/30">
            <div>
              <CardTitle className="flex items-center text-xl">
                {strategy.preferences.isFavorite && (
                  <StarIcon className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />
                )}
                {strategy.name}
              </CardTitle>
              <CardDescription>{strategy.description || "No description available."}</CardDescription>
            </div>
            <Badge variant={strategy.riskLevel === 'AGGRESSIVE' ? 'destructive' : 'outline'}
                   className="capitalize"
            >
              {strategy.riskLevel.toLowerCase()}
            </Badge>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Asset</p>
                <p className="font-semibold">{strategy.assetTicker}</p>
              </div>
              <div>
                <p className="text-muted-foreground">APY</p>
                <p className="font-semibold text-green-600">{strategy.apy.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Platform</p>
                <p className="font-semibold">{strategy.platform || "N/A"}</p>
              </div>
            </div>
            
            {strategy.allocation.allocatedAmount > 0 ? (
              <div className="p-3 rounded-md bg-green-50 border border-green-200 space-y-2">
                <h4 className="font-semibold text-green-800 flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-2" /> Your Investment
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-green-700">Invested Amount</p>
                    <p className="font-bold text-green-800">
                      {strategy.allocation.allocatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      <span className="text-xs ml-1">{strategy.assetTicker}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-green-700">Yield Earned</p>
                    <p className="font-bold text-green-800">
                      {strategy.allocation.cumulativeYieldEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                       <span className="text-xs ml-1">{strategy.assetTicker}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-md bg-slate-50 border text-center">
                <p className="text-sm text-muted-foreground">You are not currently invested in this strategy.</p>
                {/* TODO: Add a "Deposit" button/link here */}
              </div>
            )}
          </CardContent>
          {/* Optional: Add CardFooter for actions like Deposit/Withdraw/Manage */}
        </Card>
      ))}
    </div>
  );
} 