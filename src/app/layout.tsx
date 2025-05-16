import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Web3Provider } from "@/components/web3-provider";
import { Toaster } from "@/components/ui/toaster";
import { TrpcProvider } from "@/components/TrpcProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Vault",
  description: "Deposit and Claim $SOL",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <Web3Provider>
        <TrpcProvider>
          <body className={outfit.className}>
            {children}
            <Toaster />
          </body>
        </TrpcProvider>
      </Web3Provider>
    </html>
  );
}
