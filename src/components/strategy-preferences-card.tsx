"use client";

import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Label } from "@/components/ui/label"; // Assuming shadcn/ui Label
import { Switch } from "@/components/ui/switch"; // Assuming shadcn/ui Switch
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming shadcn/ui Card
import { trpc } from '@/lib/trpc'; // Import tRPC hook
import { Strategy } from '@/generated/prisma'; // Assuming Strategy type is available

// Define a type for strategy with preferences for frontend use
interface StrategyWithPreferences extends Strategy {
  preferences: {
    isFavorite: boolean;
    isHidden: boolean;
    receiveNotifications: boolean;
  };
}

export function StrategyPreferencesCard() {
  const { data: strategiesWithPrefs, isLoading, error, refetch } = trpc.strategy.getAllWithPreferences.useQuery(
    undefined, // No input for now
    {
      // Optional: configure query behavior e.g., refetchOnWindowFocus: false
    }
  );

  const setPreferenceMutation = trpc.strategy.setPreference.useMutation({
    onSuccess: () => {
      refetch(); // Refetch the strategies to update the UI
      // Optionally, add a toast notification for success
    },
    onError: (error) => {
      // Optionally, add a toast notification for error
      console.error("Failed to update preference:", error);
    },
  });

  // Local state to manage optimistic updates or complex interactions if needed
  // For now, we directly use `strategy.preferences` for checked state and rely on refetch

  const handlePreferenceChange = (
    strategyId: string,
    preferenceKey: 'isFavorite' | 'isHidden' | 'receiveNotifications',
    value: boolean
  ) => {
    setPreferenceMutation.mutate({
      strategyId,
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
        </CardContent>
      </Card>
    );
  }

  if (!strategiesWithPrefs || strategiesWithPrefs.length === 0) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Manage your preferences for individual investment strategies. Mark strategies as favorites for quick access, 
          hide those you're not interested in, and control notifications.
        </p>
        <div className="space-y-4">
          {(strategiesWithPrefs as StrategyWithPreferences[]).map((strategy) => (
            <div key={strategy.id} className="p-4 border rounded-md space-y-3">
              <h3 className="font-semibold">{strategy.name} ({strategy.assetTicker})</h3>
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
                  onCheckedChange={(value) => handlePreferenceChange(strategy.id, 'isFavorite', value)}
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