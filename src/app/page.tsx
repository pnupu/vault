"use client";

import Image from "next/image";
import { WalletButton } from "@/components/wallet-button";
import { DepositCard } from "@/components/deposit-card";
import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategyPreferencesCard } from "@/components/strategy-preferences-card";
import { YieldOptOutCard } from "@/components/yield-opt-out-card";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { AdminUserList } from "@/components/admin/admin-user-list";
import { InvestmentCard } from "@/components/invest/investment-card";
import { TransactionsCard } from "@/components/transactions/transactions-card";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { connected } = useWallet();

  // Determine active tabs and grid columns
  const showAdminTab = isAdmin && !isAdminLoading;
  const gridColsClass = showAdminTab ? "grid-cols-5" : "grid-cols-4";

  // Determine if tabs should be disabled
  const tabsDisabled = !connected;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start p-16 pt-24 sm:pt-32">
      <Header />
      <div className="mt-0">
        <Tabs defaultValue="deposit" className="w-full max-w-4xl">
          <TabsList className={`grid w-full ${gridColsClass}`}>
            <TabsTrigger value="deposit" disabled={tabsDisabled} className="w-full">Deposit</TabsTrigger>
            <TabsTrigger value="preferences" disabled={tabsDisabled} className="w-full">Preferences</TabsTrigger>
            <TabsTrigger value="invest" disabled={tabsDisabled} className="w-full">Invest</TabsTrigger>
            <TabsTrigger value="transactions" disabled={tabsDisabled} className="w-full">Transactions</TabsTrigger>
            {showAdminTab && (
              <TabsTrigger value="admin" disabled={tabsDisabled || !isAdmin} className="w-full">Admin</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="deposit" className="w-full">
            <DepositCard />
          </TabsContent>
          <TabsContent value="preferences" className="space-y-4 w-full">
            <StrategyPreferencesCard />
            <YieldOptOutCard />
          </TabsContent>
          <TabsContent value="invest" className="w-full">
            <InvestmentCard />
          </TabsContent>
          <TabsContent value="transactions" className="w-full">
            <TransactionsCard />
          </TabsContent>
          {showAdminTab && (
            <TabsContent value="admin" className="w-full">
              <AdminUserList />
            </TabsContent>
          )}
        </Tabs>
      </div>

      <div className="pointer-events-none abolute top-1/2 mb-20 ml-32 left-1/2 -translate-x-1/2 translate-y-1/2 w-52 h-28 bg-rose-700/50 blur-[120px]"></div>
    </main>
  );
}
