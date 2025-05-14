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

export default function Home() {
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  // Determine active tabs and grid columns
  const showAdminTab = isAdmin && !isAdminLoading;
  const gridColsClass = showAdminTab ? "grid-cols-5" : "grid-cols-4";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-16 pt-24 sm:pt-32">
      <Header />
      <div className="mt-8">
        <Tabs defaultValue="deposit" className="w-full max-w-4xl">
          <TabsList className={`grid w-full ${gridColsClass}`}>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="invest">Invest</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            {showAdminTab && (
              <TabsTrigger value="admin">Admin</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="deposit">
            <DepositCard />
          </TabsContent>
          <TabsContent value="preferences" className="space-y-4">
            <StrategyPreferencesCard />
            <YieldOptOutCard />
          </TabsContent>
          <TabsContent value="invest">
            <InvestmentCard />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionsCard />
          </TabsContent>
          {showAdminTab && (
            <TabsContent value="admin">
              <AdminUserList />
            </TabsContent>
          )}
        </Tabs>
      </div>

      <div className="pointer-events-none abolute top-1/2 mb-20 ml-32 left-1/2 -translate-x-1/2 translate-y-1/2 w-52 h-28 bg-rose-700/50 blur-[120px]"></div>
    </main>
  );
}
