"use client";

import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Label } from "@/components/ui/label"; // Assuming shadcn/ui Label
import { Switch } from "@/components/ui/switch"; // Assuming shadcn/ui Switch
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming shadcn/ui Card
import { trpc } from '@/lib/trpc'; // Import tRPC hook
import { StrategyTemplate } from '@/generated/prisma'; // Corrected import

// Updated interface to match the data structure from getAllWithPreferences
interface StrategyUIData extends StrategyTemplate {
  apy: number;
  sources: string[];
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
  // yieldOpportunities are not sent to the client, so not included here
}

export function StrategyPreferencesCard() {
  const { data: strategiesData, isLoading, error, refetch } = trpc.strategy.getAllWithPreferences.useQuery(
    undefined,
    {}
  );

  const setPreferenceMutation = trpc.strategy.setPreference.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.error("Failed to update preference:", err);
    },
  });

  const handlePreferenceChange = (
    strategyTemplateId: string, // Corrected: was strategyId
    preferenceKey: 'isFavorite' | 'isHidden' | 'receiveNotifications',
    value: boolean
  ) => {
    setPreferenceMutation.mutate({
      strategyTemplateId, // Corrected: was strategyId
      [preferenceKey]: value,
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Strategy Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading strategy preferences...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Strategy Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading preferences: {error.message}</p>
          <p className="text-xs text-muted-foreground">Check server logs for more details if this is a 500 error.</p>
        </CardContent>
      </Card>
    );
  }

  if (!strategiesData || strategiesData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Strategy Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No strategies available to set preferences for.</p>
        </CardContent>
      </Card>
    );
  }

  // Explicitly cast the fetched data to our defined UI type
  const typedStrategiesData = strategiesData as StrategyUIData[];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Strategy Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Manage your preferences for individual investment strategies. Mark strategies as favorites for quick access, 
          hide those you&apos;re not interested in, and control notifications.
        </p>
        <div className="space-y-4">
          {typedStrategiesData.map((strategy) => (
            <div key={strategy.id} className="p-4 border rounded-md space-y-3">
              <h3 className="font-semibold">{strategy.name} ({strategy.assetTicker}) - APY: {strategy.apy.toFixed(2)}%</h3>
              <p className="text-xs text-muted-foreground">Original Description: {strategy.description}</p> {/* strategy.description is from template, overridden by backend logic in display but can be shown here if needed */}
              <p className="text-xs text-muted-foreground">Dynamic Sources: {strategy.sources.join(', ')}</p>
              
              <div className="flex items-center justify-between">
                <Label htmlFor={`favorite-${strategy.id}`} className="flex flex-col items-start space-y-1 cursor-pointer">
                  <span>Favorite</span>
                  <span className="font-normal leading-snug text-muted-foreground text-xs">
                    Mark as favorite for easy access.
                  </span>
                </Label>
                <Switch
                  id={`favorite-${strategy.id}`}
                  checked={strategy.preferences.isFavorite}
                  onCheckedChange={(value) => handlePreferenceChange(strategy.id, 'isFavorite', value) // strategy.id is correct here as it's from StrategyTemplate
                  }
                  aria-label={`Mark ${strategy.name} as favorite`}
                  disabled={setPreferenceMutation.isPending}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor={`hidden-${strategy.id}`} className="flex flex-col items-start space-y-1 cursor-pointer">
                  <span>Hide Strategy</span>
                   <span className="font-normal leading-snug text-muted-foreground text-xs">
                    Hide this strategy from your main views.
                  </span>
                </Label>
                <Switch
                  id={`hidden-${strategy.id}`}
                  checked={strategy.preferences.isHidden}
                  onCheckedChange={(value) => handlePreferenceChange(strategy.id, 'isHidden', value)}
                  aria-label={`Hide ${strategy.name}`}
                  disabled={setPreferenceMutation.isPending}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor={`notifications-${strategy.id}`} className="flex flex-col items-start space-y-1 cursor-pointer">
                  <span>Receive Notifications</span>
                  <span className="font-normal leading-snug text-muted-foreground text-xs">
                    Get notified about important updates for this strategy.
                  </span>
                </Label>
                <Switch
                  id={`notifications-${strategy.id}`}
                  checked={strategy.preferences.receiveNotifications}
                  onCheckedChange={(value) => handlePreferenceChange(strategy.id, 'receiveNotifications', value)}
                  aria-label={`Receive notifications for ${strategy.name}`}
                  disabled={setPreferenceMutation.isPending}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 