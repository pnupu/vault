"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Badge } from "@/components/ui/badge";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import Image from "next/image";
import {
  VaultProgram,
} from "@/utils/vault_program";
import{
  getCounterPDA,
  getVaultPDA,
  getTokenVaultPDA,
} from "@/lib/utils"
import { useSolanaProvider } from "@/hooks/solanaProvider";
import { BN, Program } from "@coral-xyz/anchor";
import idl from "@/utils/vault_program.json";
import { useToast } from "@/components/ui/use-toast";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { Provider } from "@coral-xyz/anchor";

// Define USDC Mint constant (Devnet)
const USDC_MINT_ADDRESS = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
const USDC_DECIMALS = 6;

export function DepositCard() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const provider = useSolanaProvider();
  const toast = useToast();

  const [userBalance, setUserBalance] = useState(0);
  const [vaultBalance, setVaultBalance] = useState(0);
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [interactionsData, setInteractionsData] = useState<{
    totalDeposits: number;
    totalWithdrawals: number;
  }>();

  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0);
  const [vaultTokenBalance, setVaultTokenBalance] = useState<number>(0);
  const [userTokenBalanceLamports, setUserTokenBalanceLamports] = useState<bigint>(BigInt(0));

  const correctAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const value = e.target.valueAsNumber;
        if (value < 0) {
          // If the value is negative or NaN set it to 0
          setAmount(0);
        } else if (value * LAMPORTS_PER_SOL > userBalance) {
          // If the value is greater than the user balance set it to the user balance - 0.000001 padding
          setAmount(userBalance / LAMPORTS_PER_SOL - 0.000001);
        } else {
          // Otherwise set the amount to the value
          setAmount(value);
        }
      } catch (e) {}
    },
    [userBalance, setAmount]
  );

  const correctTokenAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const value = e.target.valueAsNumber;
        const valueLamports = BigInt(Math.floor(value * Math.pow(10, USDC_DECIMALS)));

        if (value < 0) {
          setTokenAmount(0);
        } else if (userTokenBalanceLamports > 0 && valueLamports > userTokenBalanceLamports) {
          setTokenAmount(Number(userTokenBalanceLamports) / Math.pow(10, USDC_DECIMALS));
        } else {
          setTokenAmount(value);
        }
      } catch (e) {}
    },
    [setTokenAmount, userTokenBalanceLamports]
  );

  const onMoveFunds = async (type: "deposit" | "withdraw") => {
    if (!provider || !publicKey || !sendTransaction) return;

    // The program variable is an instance of the Program class.
    // It takes our program's idl and the programId as arguments.
    // Using the idl it generates a set of methods that can be called on the program.
    // The programID is the public key of the program. It is used to interact with the program on-chain.
    const program = new Program<VaultProgram>(idl as any, provider as Provider);

    setIsLoading(true);

    try {
      const counterPDA = getCounterPDA(publicKey);
      const userVaultPDA = getVaultPDA(publicKey);

      // Add detailed logging
      console.log("Attempting depositSol with accounts:", {
        userInteractionsCounter: counterPDA.toBase58(),
        userVaultAccount: userVaultPDA.toBase58(),
        systemProgram: SystemProgram.programId.toBase58(),
        signer: publicKey.toBase58(),
      });
      console.log("Amount (lamports):", new BN(amount! * LAMPORTS_PER_SOL).toString());

      // The sig variable is the transaction signature.
      let sig: string | undefined;

      if (type === "deposit") {
        sig = await program.methods
          .depositSol(new BN(amount! * LAMPORTS_PER_SOL))
          .accounts({
            // @ts-ignore
            userInteractionsCounter: counterPDA,
            userVaultAccount: userVaultPDA, 
            systemProgram: SystemProgram.programId, 
            signer: publicKey, 
          })
          .rpc(); // The rpc method sends the transaction to the cluster and returns the transaction signature.
          // Moved log here
          console.log("Transaction successfully sent. Signature: ", sig);
      }
      if (type === "withdraw") {
        // Add similar detailed logging for withdraw if needed for testing
        console.log("Attempting withdrawSol with accounts:", {
          userInteractionsCounter: counterPDA.toBase58(),
          userVaultAccount: userVaultPDA.toBase58(),
          systemProgram: SystemProgram.programId.toBase58(),
          signer: publicKey.toBase58(),
        });
        console.log("Amount (lamports):", new BN(amount! * LAMPORTS_PER_SOL).toString());

        sig = await program.methods
          .withdrawSol(new BN(amount! * LAMPORTS_PER_SOL))
          .accounts({
            // @ts-ignore
            userInteractionsCounter: counterPDA,
            userVaultAccount: userVaultPDA, 
            systemProgram: SystemProgram.programId, 
            signer: publicKey, 
          })
          .rpc(); // The rpc method sends the transaction to the cluster and returns the transaction signature.
          // Moved log here
          console.log("Transaction successfully sent. Signature: ", sig);
      }

      // console.log("Transaction Signature: ", sig); // Original log, now handled above or in error
      toast.toast({
        title: "Succes!",
        description: "Your transaction was succesful",
      });

      // After the transaction is sent we update the balances of the user and the vault.
    } catch (err) {
      // More specific log
      console.error("Detailed Transaction Error in onMoveFunds: ", err); 
      toast.toast({
        title: "Error!",
        description: "Your transaction failed",
      });
    }
    setIsLoading(false);
  };

  const onMoveTokens = async (type: "deposit" | "withdraw") => {
    if (!provider || !publicKey || !sendTransaction) {
      toast.toast({ title: "Error!", description: "Wallet not connected" });
      return;
    }

    const program = new Program<VaultProgram>(idl as any, provider as Provider);
    setIsLoading(true);

    try {
      const counterPDA = getCounterPDA(publicKey);
      const userTokenAccount = getAssociatedTokenAddressSync(USDC_MINT_ADDRESS, publicKey);
      const vaultTokenPDA = getTokenVaultPDA(publicKey, USDC_MINT_ADDRESS);

      console.log("User Token Account:", userTokenAccount.toBase58());
      console.log("Vault Token PDA:", vaultTokenPDA.toBase58());

      let sig: string | undefined;

      if (type === "deposit") {
        sig = await program.methods
          .depositToken(new BN(tokenAmount! * Math.pow(10, USDC_DECIMALS)))
          .accounts({
            // @ts-ignore
            vaultTokenAccount: vaultTokenPDA,
            mint: USDC_MINT_ADDRESS,
            userTokenAccount: userTokenAccount, 
            userInteractionsCounter: counterPDA,
            signer: publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId, // Needed for init_if_needed
          })
          .rpc();
      }

      if (type === "withdraw") {
         sig = await program.methods
          .withdrawToken(new BN(tokenAmount! * Math.pow(10, USDC_DECIMALS)))
          .accounts({
            // @ts-ignore
            vaultTokenAccount: vaultTokenPDA,
            mint: USDC_MINT_ADDRESS,
            userTokenAccount: userTokenAccount,
            userInteractionsCounter: counterPDA, // Should be user_interactions_counter based on Rust struct
            signer: publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
           })
          .rpc();
      }

      console.log("Token Transaction Signature: ", sig);
      toast.toast({
        title: "Success!",
        description: "Token transaction successful",
      });

      // Refresh token balances after transaction
      await setTokenBalances(); 

    } catch (err) {
      console.error("Token Transaction Error: ", err);
      toast.toast({
        title: "Error!",
        description: "Token transaction failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Wrap in useCallback
  const setBalances = useCallback(async () => {
    if (!publicKey || !connected) return;

    const userVaultPDA = getVaultPDA(publicKey);

    // We use Promise.all to run both requests at the same time.
    await Promise.all([
      connection.getBalance(publicKey).then((balance) => {
        setUserBalance(balance);
      }),
      connection.getBalance(userVaultPDA).then((balance) => {
        setVaultBalance(balance);
      }),
    ]);
  }, [connection, publicKey, connected]);

  // Wrap in useCallback
  const setTokenBalances = useCallback(async () => {
    if (!publicKey || !connected) return;

    // Log the public key being used
    console.log("setTokenBalances called for publicKey:", publicKey.toBase58());

    try {
      const vaultTokenPDA = getTokenVaultPDA(publicKey, USDC_MINT_ADDRESS);
      const userTokenAccount = getAssociatedTokenAddressSync(USDC_MINT_ADDRESS, publicKey);
      
      // Log the calculated ATA
      console.log("Calculated User USDC ATA:", userTokenAccount.toBase58());

      // Fetch user token balance
      try {
        // Log before the RPC call
        console.log("Attempting to fetch balance for ATA:", userTokenAccount.toBase58());
        const userTokenAccInfo = await connection.getTokenAccountBalance(userTokenAccount);
        // Log the raw response
        console.log("Raw RPC Response for userTokenAccInfo:", userTokenAccInfo);
        
        setUserTokenBalance(userTokenAccInfo.value.uiAmount ?? 0);
        setUserTokenBalanceLamports(BigInt(userTokenAccInfo.value.amount));
      } catch (e) {
        console.error("Error fetching user token account balance:", e);
        console.log("User token account not found or empty.");
        setUserTokenBalance(0);
        setUserTokenBalanceLamports(BigInt(0));
      }

      // Fetch vault token balance
      try {
        const vaultTokenAccInfo = await connection.getTokenAccountBalance(vaultTokenPDA);
        setVaultTokenBalance(vaultTokenAccInfo.value.uiAmount ?? 0);
      } catch (e) {
        console.log("Vault token account not found or empty.");
        setVaultTokenBalance(0);
      }

    } catch (error) {
      console.error("Failed to fetch token balances:", error);
      setUserTokenBalance(0);
      setVaultTokenBalance(0);
      setUserTokenBalanceLamports(BigInt(0));
    }
  }, [connection, publicKey, connected, getTokenVaultPDA]);

  useEffect(() => {
    // If the user is not connected we set the balances to 0.
    if (!connected || !publicKey || !provider) {
      setUserBalance(0);
      setVaultBalance(0);
      return;
    } else {
      // Fix: Add guard to ensure provider is defined before creating Program
      if (!provider) return;

      const counterPDA = getCounterPDA(publicKey);

      // Restore programID and keep provider cast
      const program = new Program<VaultProgram>(idl as any, provider as Provider);

      setBalances();
      setTokenBalances();

      program.account.userInteractionsCounter
        .subscribe(counterPDA, "processed")
        .on("change", (data: { totalDeposits: BN; totalWithdrawals: BN }) => {
          setBalances();
          setTokenBalances();
          setInteractionsData({
            totalDeposits: data.totalDeposits.toNumber(),
            totalWithdrawals: data.totalWithdrawals.toNumber(),
          });
        });
    }
    // Restore provider dependency
  }, [publicKey, connected, provider, setBalances, setTokenBalances]);

  return (
    <Card
      className={`w-[450px] transition-all duration-500 ${
        isLoading &&
        "animate-pulse duration-1000 pointer-events-none cursor-not-allowed grayscale"
      } ${
        !connected && "pointer-events-none cursor-not-allowed grayscale blur-sm"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex flex-row items-center space-x-3">
          <p>Move Funds</p>
          <Badge variant="outline" className="font-light text-sm space-x-1">
            <Image src="/solana.png" alt="" width={12} height={12} />
            <p>{(userBalance / LAMPORTS_PER_SOL).toFixed(2)}</p>
          </Badge>
          <Badge variant="outline" className="font-light text-sm space-x-1">
            <span className="mr-1">💰</span> 
            <p>{userTokenBalance.toFixed(2)} USDC</p> 
          </Badge>
        </CardTitle>
        <CardDescription>
          Deposit or withdraw funds from your vault.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="p-5 space-y-4 flex flex-col items-center justify-center rounded-md border">
          <p className="text-sm font-normal text-white/80">
            Current Vault Balance
          </p>
          <p className="text-3xl font-semibold">
            {(vaultBalance / LAMPORTS_PER_SOL).toFixed(2)} SOL
          </p>
          <p className="text-3xl font-semibold">
            {(vaultTokenBalance ).toFixed(2)} USDC
          </p>
        </div>

        {/* <div className="flex flex-row space-x-2">
          <div className="w-full p-2 text-center rounded-md border">
            <p>{interactionsData?.totalDeposits ?? 0}</p>
            <p className="text-sm text-white/50 font-light">Deposits</p>
          </div>
          <div className="w-full p-2 text-center rounded-md border">
            <p>{interactionsData?.totalWithdrawals ?? 0}</p>
            <p className="text-sm text-white/50 font-light">Withdrawls</p>
          </div> */}
        {/* </div> */}


        <div className="border p-4 rounded-md space-y-3">
          <p className="text-lg font-medium">SOL Operations</p>

        <Input
          type="number"
          placeholder="Amount (SOL)"
          min={0}
          onChange={correctAmount}
          value={amount}
        />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="w-full text-red-500 hover:bg-red-700"
              disabled={
                amount === 0 ||
                !amount ||
                isLoading ||
                !connected ||
                userBalance === 0 ||
                amount * LAMPORTS_PER_SOL > userBalance
              }
              onClick={() => onMoveFunds("deposit")}
            >
              <ArrowDown className="mr-2 h-4 w-4" /> Deposit SOL
            </Button>
            <Button
              variant="outline"
              className="w-full text-green-500 hover:bg-green-700"
              disabled={
                amount === 0 ||
                !amount ||
                isLoading ||
                !connected ||
                vaultBalance === 0 ||
                amount * LAMPORTS_PER_SOL > vaultBalance
              }
              onClick={() => onMoveFunds("withdraw")}
            >
              <ArrowUp className="mr-2 h-4 w-4" /> Withdraw SOL
            </Button>
          </div>
        </div>

        <div className="border p-4 rounded-md space-y-3">
          <p className="text-lg font-medium">Token Operations (USDC)</p>
          {/* <div className="flex justify-between text-sm">
            <span>Your Token Balance:</span>
            <span>{userTokenBalance.toFixed(2)}</span> 
          </div>
          <div className="flex justify-between text-sm">
            <span>Vault Token Balance:</span>
            <span>{vaultTokenBalance.toFixed(2)}</span>
          </div> */}

          <Input
            type="number"
            placeholder="Amount (Token)"
            min={0}
            onChange={correctTokenAmount}
            value={tokenAmount}
          />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="w-full text-blue-500 hover:bg-blue-700"
              disabled={isLoading || !connected || tokenAmount <= 0}
              onClick={() => onMoveTokens("deposit")}
            >
              <ArrowDown className="mr-2 h-4 w-4" /> Deposit Token
            </Button>
            <Button
              variant="outline"
              className="w-full text-purple-500 hover:bg-purple-700"
              disabled={isLoading || !connected || tokenAmount <= 0 || tokenAmount > vaultTokenBalance}
              onClick={() => onMoveTokens("withdraw")}
            >
              <ArrowUp className="mr-2 h-4 w-4" /> Withdraw Token
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
