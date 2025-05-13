"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Adapter } from "@solana/wallet-adapter-base";

export function WalletButton() {
  const { connected, publicKey, wallet, wallets, connect, select, disconnect } =
    useWallet();

  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const onClickWalletButton = useCallback(() => {
    setShowWalletDialog(true);
  }, []);

  const connectWallet = useCallback(
    (adapter: Adapter) => async () => {
      select(adapter.name);
      try {
        // Attempt to connect after selecting the wallet
        await connect();
        setShowWalletDialog(false); // Close dialog on successful connection attempt
      } catch (error) {
        // Log or handle connection errors appropriately
        console.error("Failed to connect wallet:", error);
        // Optionally, provide user feedback here
      }
    },
    [select, connect] // Added connect to dependency array
  );

  const disconnectWallet = useCallback(() => {
    disconnect();
    setShowWalletDialog(true);
  }, []);

  return (
    <>
      {connected === true && wallet !== null && publicKey !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {
                <div className="flex flex-row items-center justify-center space-x-2">
                  <Image
                    src={wallet.adapter.icon}
                    alt=""
                    width={15}
                    height={15}
                  />
                  <p>
                    {publicKey.toString().slice(0, 4) +
                      "..." +
                      publicKey.toString().slice(-4)}
                  </p>
                </div>
              }
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClickWalletButton}>
              Change Wallet
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet}>
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          onClick={onClickWalletButton}
          className={`${!connected && "animate-bounce"}`}
        >
          Connect Wallet
        </Button>
      )}

      <Dialog
        open={showWalletDialog}
        onOpenChange={(open) => setShowWalletDialog(open)}
      >
        <DialogContent className="max-w-xs">
          <DialogHeader className="mb-2">
            <DialogTitle>Connect Wallet</DialogTitle>
          </DialogHeader>

          {wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              className="flex flex-row items-center space-x-4 rounded-lg border border-white/5 p-3 hover:bg-white/5 transition-colors"
              onClick={connectWallet(wallet.adapter)}
            >
              <Image src={wallet.adapter.icon} alt="" width={25} height={25} />
              <p>{wallet.adapter.name}</p>
            </button>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
