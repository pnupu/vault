"use client";

import Image from 'next/image'; // Import Next.js Image component
import { useState, useMemo } from 'react'; // Import useState and useMemo
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from '@/lib/trpc';
import { YieldOpportunity } from '@/generated/prisma'; // Assuming YieldOpportunity type is available

// Define a type for yield opportunity with opt-out status for frontend use
interface YieldOpportunityWithOptOut extends YieldOpportunity {
  isOptedOut: boolean;
}

export function YieldOptOutCard() {
  const [groupByOption, setGroupByOption] = useState<string>('platform'); // Default to platform
  const [marketFilter, setMarketFilter] = useState<string>('');
  const [assetFilter, setAssetFilter] = useState<string>('all'); // 'all' or specific asset ticker

  const utils = trpc.useUtils(); // <--- Add this to get tRPC utils

  const { 
    data: opportunitiesWithOptOut, 
    isLoading, 
    error, 
    refetch 
  } = trpc.yieldOpportunity.getAllWithOptOutStatus.useQuery(
    undefined, // No input for now
    {
      // Optional: configure query behavior
    }
  );

  const setOptOutMutation = trpc.yieldOpportunity.setOptOut.useMutation({
    onSuccess: () => {
      refetch(); // Refetch the opportunities to update the UI
      utils.strategy.getAllWithPreferences.invalidate(); // <--- Add this line
      // Optionally, add a toast notification for success
    },
    onError: (error) => {
      // Optionally, add a toast notification for error
      console.error("Failed to update opt-out status:", error);
    },
  });

  const handleOptOutChange = (
    yieldOpportunityId: string,
    isOptedOut: boolean
  ) => {
    setOptOutMutation.mutate({
      yieldOpportunityId,
      optedOut: isOptedOut,
    });
  };

  const handleGroupOptOutChange = (opportunitiesInGroup: YieldOpportunityWithOptOut[], newOptOutState: boolean) => {
    opportunitiesInGroup.forEach(op => {
      // Only mutate if the current state is different from the target state
      if (op.isOptedOut !== newOptOutState) {
        setOptOutMutation.mutate({ yieldOpportunityId: op.id, optedOut: newOptOutState });
      }
    });
  };

  const uniqueAssetTickers = useMemo(() => {
    if (!opportunitiesWithOptOut) return [];
    const tickers = new Set(opportunitiesWithOptOut.map(op => op.assetTicker));
    return ['all', ...Array.from(tickers).sort()];
  }, [opportunitiesWithOptOut]);

  const filteredAndGroupedOpportunities = useMemo(() => {
    if (!opportunitiesWithOptOut) return groupByOption === 'none' ? [] : {};

    const filtered = opportunitiesWithOptOut.filter(op => {
      const marketMatch = marketFilter ? op.marketId.toLowerCase().includes(marketFilter.toLowerCase()) : true;
      const assetMatch = assetFilter !== 'all' ? op.assetTicker === assetFilter : true;
      return marketMatch && assetMatch;
    });

    if (groupByOption === 'none') return filtered;

    return filtered.reduce((acc, op) => {
      const key = op[groupByOption as keyof YieldOpportunity] as string | number | null;
      const groupKey = String(key ?? 'Unknown'); // Handle null or undefined keys
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(op);
      return acc;
    }, {} as Record<string, YieldOpportunityWithOptOut[]>);

  }, [opportunitiesWithOptOut, marketFilter, assetFilter, groupByOption]);

  const renderOpportunityItem = (opportunity: YieldOpportunityWithOptOut, index: number, arrayLength: number) => (
    <div 
      key={opportunity.id} 
      className={`p-4 flex items-center justify-between ${index < arrayLength - 1 ? 'border-b' : ''}`}
    >
      <div className="flex items-center flex-grow space-x-3 mr-4">
        {/* Ticker Image */}
        {opportunity.tickerImage && (
          <div className="flex-shrink-0 w-6 h-6 relative">
            <Image 
              src={`/${opportunity.tickerImage}`}
              alt={`${opportunity.name} ticker`}
              fill
              sizes="24px"
              className="rounded-full object-cover"
            />
          </div>
        )}
        {/* Platform Image - can be shown if different from ticker or for branding */}
        {opportunity.platformImage && opportunity.platformImage !== opportunity.tickerImage && (
          <div className="flex-shrink-0 w-6 h-6 relative">
            <Image 
              src={`/${opportunity.platformImage}`}
              alt={`${opportunity.platform} logo`}
              fill
              sizes="24px"
              className="rounded-full object-cover"
            />
          </div>
        )}
        <Label htmlFor={`optout-${opportunity.id}`} className="flex-grow cursor-pointer">
          <span className="font-semibold">{opportunity.name}</span>
          <span className="block text-xs text-muted-foreground">
            Platform: {opportunity.platform} - APY: {opportunity.apy.toFixed(2)}% - Market: {opportunity.marketId}
          </span>
          <span className="block text-xs text-muted-foreground">
            {opportunity.isOptedOut ? "You have opted out." : "You are opted in."}
          </span>
        </Label>
      </div>
      <Switch
        id={`optout-${opportunity.id}`}
        checked={opportunity.isOptedOut}
        onCheckedChange={(value) => handleOptOutChange(opportunity.id, value)}
        aria-label={`Opt-out of ${opportunity.name}`}
        disabled={setOptOutMutation.isPending}
      />
    </div>
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Yield Opportunity Opt-Outs</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading yield opportunities...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Yield Opportunity Opt-Outs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading opt-out settings: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!opportunitiesWithOptOut || opportunitiesWithOptOut.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Yield Opportunity Opt-Outs</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No yield opportunities available to manage.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yield Opportunity Opt-Outs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Manage your opt-out preferences for specific yield opportunities. 
          If you opt-out, these opportunities may be hidden or excluded from automatic allocations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-muted/50">
          <div>
            <Label htmlFor="market-filter" className="text-xs font-medium">Filter by Market ID</Label>
            <Input 
              id="market-filter"
              placeholder="e.g., JLP-USDC, SOL, etc."
              value={marketFilter}
              onChange={(e) => setMarketFilter(e.target.value)}
              className="mt-1 h-9"
            />
          </div>
          <div>
            <Label htmlFor="asset-filter" className="text-xs font-medium">Filter by Asset</Label>
            <Select value={assetFilter} onValueChange={setAssetFilter}>
              <SelectTrigger id="asset-filter" className="mt-1 h-9">
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>
              <SelectContent>
                {uniqueAssetTickers.map(ticker => (
                  <SelectItem key={ticker} value={ticker}> {ticker === 'all' ? 'All Assets' : ticker} </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="group-by" className="text-xs font-medium">Group By</Label>
            <Select value={groupByOption} onValueChange={setGroupByOption}>
              <SelectTrigger id="group-by" className="mt-1 h-9">
                <SelectValue placeholder="Select Grouping" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="platform">Platform</SelectItem>
                <SelectItem value="assetTicker">Asset Ticker</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-0 border rounded-md overflow-hidden">
          {groupByOption === 'none' ? 
            (filteredAndGroupedOpportunities as YieldOpportunityWithOptOut[]).length > 0 ?
              (filteredAndGroupedOpportunities as YieldOpportunityWithOptOut[]).map((op, idx, arr) => renderOpportunityItem(op, idx, arr.length))
              : <p className="p-4 text-center text-muted-foreground">No opportunities match your filters.</p>
            : Object.entries(filteredAndGroupedOpportunities as Record<string, YieldOpportunityWithOptOut[]>).map(([groupKey, opsInGroup]) => {
                if (opsInGroup.length === 0) return null; // Don't render empty groups
                const areAllInGroupOptedOut = opsInGroup.every(op => op.isOptedOut);
                return (
                  <div key={groupKey} className="border-b last:border-b-0">
                    <div className="flex items-center justify-between p-3 bg-muted/80 sticky top-0 z-10 border-b">
                      <h3 className="text-md font-semibold">{groupKey} <span className="text-xs font-normal text-muted-foreground">({opsInGroup.length})</span></h3>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`group-optout-${groupKey}`} className="text-xs cursor-pointer">
                          {areAllInGroupOptedOut ? "Opt-in all in group" : "Opt-out all in group"}
                        </Label>
                        <Switch 
                          id={`group-optout-${groupKey}`}
                          checked={areAllInGroupOptedOut}
                          onCheckedChange={(isChecked) => handleGroupOptOutChange(opsInGroup, isChecked)}
                          disabled={setOptOutMutation.isPending}
                        />
                      </div>
                    </div>
                    <div className="divide-y">
                      {opsInGroup.map((op, idx) => renderOpportunityItem(op, idx, opsInGroup.length))}
                    </div>
                  </div>
                );
            })
          }
          {groupByOption !== 'none' && 
           Object.values(filteredAndGroupedOpportunities as Record<string, YieldOpportunityWithOptOut[]>).every(ops => ops.length === 0) &&
           <p className="p-4 text-center text-muted-foreground">No opportunities match your filters.</p>
          }
        </div>
      </CardContent>
    </Card>
  );
} 