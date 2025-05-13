import Image from "next/image";
import { WalletButton } from "@/components/wallet-button";
import { DepositCard } from "@/components/deposit-card";
import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-16">
      <Header />
      <div className="absolute">
        <Tabs defaultValue="deposit">
          <TabsList>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="claim">Claim</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <DepositCard />
          </TabsContent>
          <TabsContent value="claim">
            <p>Claim</p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="pointer-events-none abolute top-1/2 mb-20 ml-32 left-1/2 -translate-x-1/2 translate-y-1/2 w-52 h-28 bg-rose-700/50 blur-[120px]"></div>
    </main>
  );
}
