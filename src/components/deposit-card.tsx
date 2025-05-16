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
import { getAssociatedTokenAddressSync, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { Provider } from "@coral-xyz/anchor";
import { trpc } from "@/lib/trpc";

// Define USDC Mint constant (Devnet)
const USDC_MINT_ADDRESS = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
const USDC_DECIMALS = 6;
const USDC_SYMBOL = "USDC"; // Ensure this is defined

// Define types for the addToHistory function
type HistoryActionType = 
  | 'DEPOSIT_SOL' 
  | 'WITHDRAW_SOL' 
  | 'DEPOSIT_TOKEN' 
  | 'WITHDRAW_TOKEN' 
  | 'REQUEST_WITHDRAWAL';

interface SolPayload {
  amountSol: number;
  transactionSignature: string;
}

interface TokenPayload {
  amountUi: number;
  tokenMint: string;
  tokenSymbol: string;
  tokenDecimals: number;
  transactionSignature: string;
}

interface RequestPayload {
  amount: number;
  asset: string; // "SOL" or token symbol like "USDC"
}

type HistoryPayload = SolPayload | TokenPayload | RequestPayload;

// Define the expected type for a single transaction item based on linter feedback
type TradingHistoryItem = {
  id: string;
  userId: string;
  action: string;
  asset: string;
  amount: number;
  price: number | null;
  strategyTemplateId: string | null;
  timestamp: Date; 
  // strategyTemplate: { name: string; } | null; // Not used in current calculation, can be omitted if not needed elsewhere
};

export function DepositCard() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const provider = useSolanaProvider();
  const { toast } = useToast();
  const utils = trpc.useUtils();

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

  // State for admin and config PDAs
  const [adminWallet, setAdminWallet] = useState<PublicKey | null>(null);
  const [appConfigPda, setAppConfigPda] = useState<PublicKey | null>(null);
  const [currentUserMetadataPda, setCurrentUserMetadataPda] = useState<PublicKey | null>(null);

  // State for net deposited amounts calculated from trading history
  const [netDepositedSol, setNetDepositedSol] = useState<number>(0);
  const [netDepositedUsdc, setNetDepositedUsdc] = useState<number>(0);

  // Fetch trading history for the user
  const { data: tradingHistoryData, isLoading: isLoadingHistory } = trpc.transaction.getAllForUser.useQuery(
    {}, // Changed from undefined to an empty object, assuming no specific input for "get all"
    {
      enabled: !!publicKey && connected, // Only run query if wallet is connected
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
    }
  );

  // Effect to calculate net deposited balances from trading history
  useEffect(() => {
    if (tradingHistoryData && tradingHistoryData.items) {
      let currentNetSol = 0;
      let currentNetUsdc = 0;

      tradingHistoryData.items.forEach((tx: TradingHistoryItem) => {
        if (tx.asset === "SOL") {
          if (tx.action === "DEPOSIT_SOL") {
            currentNetSol += tx.amount;
          } else if (tx.action === "WITHDRAW_SOL") {
            currentNetSol -= tx.amount;
          }
        } else if (tx.asset === USDC_SYMBOL) { // Assuming USDC_SYMBOL is "USDC"
          if (tx.action === "DEPOSIT_TOKEN") {
            currentNetUsdc += tx.amount; // Assuming tx.amount for tokens is the UI amount
          } else if (tx.action === "WITHDRAW_TOKEN") {
            currentNetUsdc -= tx.amount;
          }
        }
      });

      setNetDepositedSol(currentNetSol);
      setNetDepositedUsdc(currentNetUsdc);
    }
  }, [tradingHistoryData]);

  // Define tRPC mutations before they are used in addToHistory
  const recordDepositSolMutation = trpc.transaction.recordDepositSol.useMutation({
    onSuccess: () => {
      toast({ title: "Success!", description: "SOL Deposit recorded." });
      utils.transaction.getAllForUser.invalidate();
      // setBalances(); // Assuming setBalances is defined elsewhere
    },
    onError: (err: any) => {
      toast({ title: "Recording Error", description: err.message });
    },
  });

  const recordWithdrawSolMutation = trpc.transaction.recordWithdrawSol.useMutation({
    onSuccess: () => {
      toast({ title: "Success!", description: "SOL Withdrawal recorded." });
      utils.transaction.getAllForUser.invalidate();
      // setBalances(); 
    },
    onError: (err: any) => {
      toast({ title: "Recording Error", description: err.message });
    },
  });

  const recordDepositTokenMutation = trpc.transaction.recordDepositToken.useMutation({
    onSuccess: () => {
      toast({ title: "Success!", description: "Token Deposit recorded." });
      utils.transaction.getAllForUser.invalidate();
      // setTokenBalances(); 
    },
    onError: (err: any) => {
      toast({ title: "Recording Error", description: err.message });
    },
  });

  const recordWithdrawTokenMutation = trpc.transaction.recordWithdrawToken.useMutation({
    onSuccess: () => {
      toast({ title: "Success!", description: "Token Withdrawal recorded." });
      utils.transaction.getAllForUser.invalidate();
      // setTokenBalances(); 
    },
    onError: (err: any) => {
      toast({ title: "Recording Error", description: err.message });
    },
  });
  
  const recordWithdrawalRequestMutation = trpc.transaction.recordWithdrawalRequest.useMutation({
    onSuccess: () => {
      toast({ title: "Success!", description: "Withdrawal request recorded." });
      utils.transaction.getAllForUser.invalidate();
    },
    onError: (err: any) => {
      toast({ title: "Recording Error", description: err.message });
    }
  });

  const addToHistory = (actionType: HistoryActionType, payload: HistoryPayload) => {
    switch (actionType) {
      case 'DEPOSIT_SOL':
        if ('amountSol' in payload && 'transactionSignature' in payload) {
          recordDepositSolMutation.mutate(payload as SolPayload);
        } else {
          toast({ title: "History Error", description: "Invalid data for recording SOL deposit."});
        }
        break;
      case 'WITHDRAW_SOL':
        if ('amountSol' in payload && 'transactionSignature' in payload) {
          recordWithdrawSolMutation.mutate(payload as SolPayload);
        } else {
          toast({ title: "History Error", description: "Invalid data for recording SOL withdrawal."});
        }
        break;
      case 'DEPOSIT_TOKEN':
        if ('amountUi' in payload && 'tokenMint' in payload && 'transactionSignature' in payload) {
          recordDepositTokenMutation.mutate(payload as TokenPayload);
        } else {
          toast({ title: "History Error", description: "Invalid data for recording token deposit."});
        }
        break;
      case 'WITHDRAW_TOKEN':
        if ('amountUi' in payload && 'tokenMint' in payload && 'transactionSignature' in payload) {
          recordWithdrawTokenMutation.mutate(payload as TokenPayload);
        } else {
          toast({ title: "History Error", description: "Invalid data for recording token withdrawal."});
        }
        break;
      case 'REQUEST_WITHDRAWAL':
        if ('amount' in payload && 'asset' in payload) {
          recordWithdrawalRequestMutation.mutate(payload as RequestPayload);
        } else {
          toast({ title: "History Error", description: "Invalid data for recording withdrawal request."});
        }
        break;
      default:
        const _exhaustiveCheck: never = actionType; // For exhaustive type checking
        toast({ title: "History Error", description: `Unknown action type encountered.`});
    }
  };

  const correctAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const value = e.target.valueAsNumber;
        const padding = 0.000001;

        if (value < 0 || isNaN(value)) {
          // If the value is negative or NaN set it to 0
          setAmount(0);
        } else if (value * LAMPORTS_PER_SOL > userBalance) {
          // If the value is greater than the user balance
          const maxSol = userBalance / LAMPORTS_PER_SOL;
          if (maxSol < padding && maxSol >= 0) {
            // If max SOL is less than padding (and non-negative), set to maxSol (could be 0)
            setAmount(maxSol);
          } else if (maxSol >= padding) {
            // If max SOL is enough for padding, subtract padding
            setAmount(maxSol - padding);
          } else {
            // Fallback for any other edge cases (e.g. userBalance is somehow negative, though unlikely)
            setAmount(0);
          }
        } else {
          // Otherwise set the amount to the value
          setAmount(value);
        }
      } catch (e) {
        // In case of any error during conversion or logic, set to 0
        setAmount(0);
      }
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

  const ensureUserMetadataInitialized = async (program: Program<VaultProgram>, userMetadataPda: PublicKey, userPublicKey: PublicKey) => {
    try {
      const metadataAccount = await connection.getAccountInfo(userMetadataPda);
      if (metadataAccount) {
        // User metadata already initialized.
        return true;
      }

      // User metadata not found, attempting to initialize...
      const tx = await program.methods
        .initializeUserMetadata()
        .accounts({
          userMetadata: userMetadataPda,
          user: userPublicKey,
          systemProgram: SystemProgram.programId,
        } as any)
        // .signers([// Signer is implicitly the wallet provider]) // No explicit signer needed here if using provider.wallet
        .rpc();
      // Initialize user metadata transaction: tx
      await connection.confirmTransaction(tx, "confirmed");
      toast({ title: "Success!", description: "User metadata initialized." });
      return true;
    } catch (error) {
      // console.error("Failed to initialize user metadata:", error);
      toast({ title: "Metadata Error", description: `Failed to initialize user metadata: ${error}` });
      return false;
    }
  };

  const onMoveFunds = async (type: "deposit" | "withdraw") => {
    if (!provider || !publicKey || !sendTransaction) return;

    setIsLoading(true);
    try {
      // Ensure adminWallet, appConfigPda, and currentUserMetadataPda are loaded for deposit
      if (type === "deposit" && (!adminWallet || !appConfigPda || !currentUserMetadataPda)) {
        toast({ title: "Error", description: "Configuration data not loaded yet. Please wait and try again."});
        setIsLoading(false);
        return;
      }

      const program = new Program<VaultProgram>(idl as any, provider as Provider);

      if (type === "deposit" && currentUserMetadataPda && publicKey) {
        const metadataInitialized = await ensureUserMetadataInitialized(program, currentUserMetadataPda, publicKey);
        if (!metadataInitialized) {
          setIsLoading(false);
          return; // Stop if metadata initialization failed
        }
      }

      const counterPDA = getCounterPDA(publicKey);
      const userVaultPDA = getVaultPDA(publicKey);

      let sig: string | undefined;

      if (type === "deposit") {
        sig = await program.methods
          .depositSol(new BN(amount! * LAMPORTS_PER_SOL))
          .accounts({
            userVaultAccount: userVaultPDA,
            userInteractionsCounter: counterPDA,
            userMetadata: currentUserMetadataPda!,
            config: appConfigPda!,
            adminInvestmentWallet: adminWallet!,
            signer: publicKey,
            systemProgram: SystemProgram.programId,
          } as any)
          .rpc();
          if (sig) {
            addToHistory('DEPOSIT_SOL', { amountSol: amount, transactionSignature: sig });
          }
      }
      if (type === "withdraw") {
        sig = await program.methods
          .withdrawSol(new BN(amount! * LAMPORTS_PER_SOL))
          .accounts({
            userInteractionsCounter: counterPDA,
            userVaultAccount: userVaultPDA, 
            systemProgram: SystemProgram.programId, 
            signer: publicKey, 
          } as any)
          .rpc();
          if (sig) {
            addToHistory('WITHDRAW_SOL', { amountSol: amount, transactionSignature: sig });
          }
      }

      toast({
        title: "Success!",
        description: "Your transaction was successful",
      });

    } catch (err) {
      // console.error("Detailed Transaction Error in onMoveFunds: ", err);
      toast({
        title: "Error!",
        description: `Transaction failed: ${err}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRequestWithdrawal = async (asset: "SOL" | "USDC", withdrawalAmount: number) => {
    if (!provider || !publicKey || !sendTransaction) {
      toast({ title: "Error!", description: "Wallet not connected" });
      return;
    }
    if (withdrawalAmount <= 0) {
      toast({ title: "Error!", description: "Amount must be greater than zero for withdrawal request." });
      return;
    }

    addToHistory('REQUEST_WITHDRAWAL', { amount: withdrawalAmount, asset });
    toast({ title: "Success!", description: "Withdrawal requested" });
  }

  const onMoveTokens = async (type: "deposit" | "withdraw") => {
    if (!provider || !publicKey || !sendTransaction) {
      toast({ title: "Error!", description: "Wallet not connected" });
      return;
    }

    setIsLoading(true);
    try {
      // Ensure adminWallet, appConfigPda, and currentUserMetadataPda are loaded for deposit
      if (type === "deposit" && (!adminWallet || !appConfigPda || !currentUserMetadataPda)) {
        toast({ title: "Error", description: "Configuration data not loaded yet. Please wait and try again."});
        setIsLoading(false);
        return;
      }

      const program = new Program<VaultProgram>(idl as any, provider as Provider);

      if (type === "deposit" && currentUserMetadataPda && publicKey) {
        const metadataInitialized = await ensureUserMetadataInitialized(program, currentUserMetadataPda, publicKey);
        if (!metadataInitialized) {
          setIsLoading(false);
          return; // Stop if metadata initialization failed
        }
      }

      const counterPDA = getCounterPDA(publicKey);
      const userTokenAccount = getAssociatedTokenAddressSync(USDC_MINT_ADDRESS, publicKey);
      const vaultTokenPDA = getTokenVaultPDA(publicKey, USDC_MINT_ADDRESS);
      const adminUsdcAta = adminWallet ? getAssociatedTokenAddressSync(USDC_MINT_ADDRESS, adminWallet) : null;

      let sig: string | undefined;

      if (type === "deposit") {
        if (!adminUsdcAta || !appConfigPda || !currentUserMetadataPda) {
          toast({ title: "Error", description: "Required account data for token deposit is missing." });
          setIsLoading(false);
          return;
        }
        sig = await program.methods
          .depositToken(new BN(tokenAmount! * Math.pow(10, USDC_DECIMALS)))
          .accounts({
            mint: USDC_MINT_ADDRESS,
            userTokenAccount: userTokenAccount,
            vaultTokenAccount: vaultTokenPDA, 
            adminTokenAccount: adminUsdcAta, 
            userInteractionsCounter: counterPDA,
            userMetadata: currentUserMetadataPda!, 
            config: appConfigPda!, 
            signer: publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID, 
            systemProgram: SystemProgram.programId,
          } as any)
          .rpc();
        if (sig) {
          addToHistory('DEPOSIT_TOKEN', { amountUi: tokenAmount, tokenMint: USDC_MINT_ADDRESS.toBase58(), tokenSymbol: "USDC", tokenDecimals: USDC_DECIMALS, transactionSignature: sig });
        }
      }

      if (type === "withdraw") {
         sig = await program.methods
          .withdrawToken(new BN(tokenAmount! * Math.pow(10, USDC_DECIMALS)))
          .accounts({
            vaultTokenAccount: vaultTokenPDA,
            mint: USDC_MINT_ADDRESS,
            userTokenAccount: userTokenAccount,
            userInteractionsCounter: counterPDA, 
            signer: publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
           } as any)
          .rpc();
        if (sig) {
          addToHistory('WITHDRAW_TOKEN', { amountUi: tokenAmount, tokenMint: USDC_MINT_ADDRESS.toBase58(), tokenSymbol: "USDC", tokenDecimals: USDC_DECIMALS, transactionSignature: sig });
        }
      }

      toast({
        title: "Success!",
        description: "Token transaction successful",
      });

      await setTokenBalances(); 

    } catch (err) {
      // console.error("Token Transaction Error: ", err);
      toast({
        title: "Error!",
        description: `Token transaction failed: ${err}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setBalances = useCallback(async () => {
    if (!publicKey || !connected) return;

    const userVaultPDA = getVaultPDA(publicKey);

    await Promise.all([
      connection.getBalance(publicKey).then((balance) => {
        setUserBalance(balance);
      }),
      connection.getBalance(userVaultPDA).then((balance) => {
        setVaultBalance(balance);
      }),
    ]);
  }, [connection, publicKey, connected]);

  const setTokenBalances = useCallback(async () => {
    if (!publicKey || !connected) return;

    try {
      const vaultTokenPDA = getTokenVaultPDA(publicKey, USDC_MINT_ADDRESS);
      const userTokenAccount = getAssociatedTokenAddressSync(USDC_MINT_ADDRESS, publicKey);
      
      try {
        const userTokenAccInfo = await connection.getTokenAccountBalance(userTokenAccount);
        
        setUserTokenBalance(userTokenAccInfo.value.uiAmount ?? 0);
        setUserTokenBalanceLamports(BigInt(userTokenAccInfo.value.amount));
      } catch (e) {
        // console.error("Error fetching user token account balance:", e);
        // console.log("User token account not found or empty.");
        setUserTokenBalance(0);
        setUserTokenBalanceLamports(BigInt(0));
      }

      try {
        const vaultTokenAccInfo = await connection.getTokenAccountBalance(vaultTokenPDA);
        setVaultTokenBalance(vaultTokenAccInfo.value.uiAmount ?? 0);
      } catch (e) {
        setVaultTokenBalance(0);
      }

    } catch (error) {
      // console.error("Failed to fetch token balances:", error);
      setUserTokenBalance(0);
      setVaultTokenBalance(0);
      setUserTokenBalanceLamports(BigInt(0));
    }
  }, [connection, publicKey, connected]);

  useEffect(() => {
    if (!connected || !publicKey || !provider) {
      setUserBalance(0);
      setVaultBalance(0);
      setAdminWallet(null); 
      setAppConfigPda(null); 
      setCurrentUserMetadataPda(null); 
      return;
    } else {
      if (!provider) return;

      const counterPDA = getCounterPDA(publicKey);
      const program = new Program<VaultProgram>(idl as any, provider as Provider);

      setBalances();
      setTokenBalances();

      const [configKey] = PublicKey.findProgramAddressSync(
        [Buffer.from("config_v2")],
        program.programId
      );
      setAppConfigPda(configKey);

      program.account.vaultConfig.fetch(configKey)
        .then(configData => {
          setAdminWallet(configData.admin);
          // Fetched admin wallet: configData.admin.toBase58()
        })
        .catch(err => {
          // console.error("Failed to fetch vault config:", err);
          toast({ title: "Config Error", description: "Could not load program configuration. Deposits may fail."});
        });

      const [metadataKey] = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), publicKey.toBuffer()],
        program.programId
      );
      setCurrentUserMetadataPda(metadataKey);
      // Set user metadata PDA: metadataKey.toBase58()

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
  }, [publicKey, connected, provider, setBalances, setTokenBalances, toast]); 

  return (
    <Card
      className={`w-[650px] transition-all duration-500 ${
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
            Platform Balance (Net Deposits)
          </p>
          <p className="text-3xl font-semibold">
            {netDepositedSol.toFixed(2)} SOL
          </p>
          <p className="text-3xl font-semibold">
            {netDepositedUsdc.toFixed(2)} USDC
          </p>
        </div>

        <div className="border p-4 rounded-md space-y-3">
          <p className="text-lg font-medium">SOL Operations</p>
          <div className="flex justify-between text-sm">
            <span>Vault Balance:</span>
            <span>{(vaultBalance / LAMPORTS_PER_SOL).toFixed(2)} SOL</span>
          </div>

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
                isLoading ||
                !connected
              }
              onClick={() => onRequestWithdrawal("SOL", amount)}
            >
              <ArrowDown className="mr-2 h-4 w-4" /> Request Withdrawal
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
          <div className="flex justify-between text-sm">
            <span>Vault Token Balance:</span>
            <span>{vaultTokenBalance.toFixed(2)}</span>
          </div>

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
              disabled={isLoading || !connected || tokenAmount <= 0}
              onClick={() => onRequestWithdrawal("USDC", tokenAmount)}
            >
              <ArrowUp className="mr-2 h-4 w-4" /> Request Withdrawal
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
