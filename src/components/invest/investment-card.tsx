"use client";

import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StarIcon, BriefcaseIcon } from "lucide-react"; // Removed TrendingUpIcon as it wasn't used
import { StrategyTemplate } from "@/generated/prisma"; // Changed Strategy to StrategyTemplate
import { Badge } from "@/components/ui/badge";
import { HistoryChart } from '@/components/history-chart'; // Added import

// Define the expected shape of the data from the hook, aligning with StrategyUIData from the other card
interface InvestmentStrategyUIData extends StrategyTemplate {
  apy: number; // Dynamically calculated
  sources: string[]; // Dynamically determined sources for the APY
  // description is already part of StrategyTemplate, and is overridden by the backend
  preferences: {
    isFavorite: boolean;
    isHidden: boolean;
    receiveNotifications: boolean;
  };
  allocation: {
    allocatedAmount: number;
    cumulativeYieldEarned: number;
  };
  historicalData?: Array<{ timestamp: string, value: number }>; // Added for historical graph data
  // yieldOpportunities are not sent to the client
}

export function InvestmentCard() {
  const { 
    data: strategiesData,
    isLoading,
    error,
    // refetch // In case we add actions like deposit/withdraw later
  } = trpc.strategy.getAllWithPreferences.useQuery(undefined, {
    // refetchOnWindowFocus: false, // Consider for UX
  });

  if (isLoading) {
    return (
      <Card className="w-full">
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading investments: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  const typedStrategiesData = strategiesData as InvestmentStrategyUIData[] | undefined;

  const visibleStrategies = typedStrategiesData?.filter(
    (s) => !s.preferences.isHidden
  );

  if (!visibleStrategies || visibleStrategies.length === 0) {
    return (
      <Card className="w-full">
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
      {visibleStrategies.map((strategy) => {
        return (
        <Card key={strategy.id} className="overflow-hidden w-full">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="flex items-center text-xl">
                {strategy.preferences.isFavorite && (
                  <StarIcon className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />
                )}
                {strategy.name} {/* strategy.name is from StrategyTemplate */}
              </CardTitle>
              {/* The description from strategy.description is the dynamic one from the backend calculation */}
              <CardDescription>{strategy.description || "No description available."}</CardDescription>
            </div>
            <Badge variant={strategy.riskLevel === 'AGGRESSIVE' ? 'destructive' : 'outline'}
                   className="capitalize"
            >
              {strategy.riskLevel.toLowerCase()} {/* strategy.riskLevel is from StrategyTemplate */}
            </Badge>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Asset</p>
                <p className="font-semibold">{strategy.assetTicker}</p> {/* strategy.assetTicker is from StrategyTemplate */}
              </div>
              <div>
                <p className="text-muted-foreground">APY</p>
                <p className="font-semibold text-green-600">{strategy.apy.toFixed(2)}%</p> {/* strategy.apy is the dynamic one */}
              </div>
              <div>
                <p className="text-muted-foreground">Platform</p>
                <p className="font-semibold">{strategy.platform || "N/A"}</p> {/* strategy.platform is from StrategyTemplate */}
              </div>
            </div>
             {/* Display dynamic sources */}
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Contributing Sources (for APY):</p>
              {strategy.sources && strategy.sources.length > 0 ? (
                <ul className="list-disc list-inside pl-1">
                  {strategy.sources.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              ) : (
                <p>N/A</p>
              )}
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
                      <span className="text-xs ml-1">{strategy.assetTicker}</span> {/* strategy.assetTicker from StrategyTemplate */}
                    </p>
                  </div>
                  <div>
                    <p className="text-green-700">Yield Earned</p>
                    <p className="font-bold text-green-800">
                      {strategy.allocation.cumulativeYieldEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                       <span className="text-xs ml-1">{strategy.assetTicker}</span> {/* strategy.assetTicker from StrategyTemplate */}
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

          {/* Replace Placeholder with HistoryChart */}
          {strategy.historicalData && strategy.historicalData.length > 0 ? (
            <div className="px-4 md:px-6 pb-4 pt-2">
              <HistoryChart 
                data={strategy.historicalData} 
                assetTicker={strategy.assetTicker} 
                height="150px" // You can adjust this height
              />
            </div>
          ) : (
            <div className="px-6 pb-4 pt-2">
              <p className="text-xs text-muted-foreground text-center">No performance history available.</p>
            </div>
          )}

        </Card>
      );
    })}
    </div>
  );
} 