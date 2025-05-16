import { AnchorProvider, Provider } from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Buffer } from 'buffer';

const SOLANA_VAULT_JWT_KEY = 'solana_vault_jwt_token';

export function useSolanaProvider(): Provider | undefined {
  const [provider, setProvider] = useState<Provider>();
  const trpcUtils = trpc.useContext();

  const { connection } = useConnection();
  const { connected, publicKey, signMessage } = useWallet();
  const anchorWallet = useAnchorWallet();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isGetMeAuthError,
    error: getMeFullErrorObject,
    isSuccess: isGetMeSuccess
  } = trpc.user.getMe.useQuery(undefined, {
    enabled: connected && !!publicKey,
    retry: false,
  });
  
  useEffect(() => {
    if (isGetMeSuccess) {
      if (!user) {
        localStorage.removeItem(SOLANA_VAULT_JWT_KEY);
      }
    }
  }, [isGetMeSuccess, user]);

  useEffect(() => {
    if (isGetMeAuthError && getMeFullErrorObject) {
      console.warn("getMe query failed (useEffect):", getMeFullErrorObject.message);
      const trpcError = getMeFullErrorObject as { data?: { code?: string; httpStatus?: number } };
      if (trpcError.data?.code === 'UNAUTHORIZED' || trpcError.data?.httpStatus === 401) {
        localStorage.removeItem(SOLANA_VAULT_JWT_KEY);
      }
    }
  }, [isGetMeAuthError, getMeFullErrorObject]);

  const { mutate: verifyAndLogin, status: verifyStatus } = 
    trpc.user.verifySignatureAndLogin.useMutation({
      onSuccess: (data) => {
        localStorage.setItem(SOLANA_VAULT_JWT_KEY, data.token);
        trpcUtils.user.getMe.invalidate();
      },
      onError: (error) => {
        console.error("Verification and login failed:", error);
      }
    });

  const { mutate: getLoginChallenge, status: challengeStatus } = 
    trpc.user.requestLoginChallenge.useMutation({
      onSuccess: async (data) => {
        const nonce = data.nonce;
        if (!publicKey || !signMessage) {
          console.error("RequestLoginChallenge onSuccess: Wallet not connected or signMessage not available");
          return;
        }
        try {
          const message = new TextEncoder().encode(nonce);
          const signature = await signMessage(message);
          const signatureString = Buffer.from(signature).toString('base64');
          verifyAndLogin({
            walletAddress: publicKey.toBase58(),
            nonce,
            signature: signatureString,
          });
        } catch (error) {
          console.error("Failed to sign message:", error);
        }
      },
      onError: (error) => {
        console.error("Failed to get login challenge:", error);
      }
    });

  useEffect(() => {
    if (connection && anchorWallet && connected === true && publicKey) {
      setProvider(
        new AnchorProvider(connection, anchorWallet, {
          commitment: "confirmed",
        })
      );
    } else {
      setProvider(undefined);
    }
  }, [connected, connection, anchorWallet, publicKey]);

  useEffect(() => {
    if (!(connected && publicKey)) {
      return;
    }

    if (user) {
      return;
    }

    if (isUserLoading) {
      return;
    }

    if (challengeStatus === 'pending' || verifyStatus === 'pending') {
      return;
    }
    
    getLoginChallenge({ walletAddress: publicKey.toBase58() });

  }, [
    connected, 
    publicKey, 
    user,
    isUserLoading,
    challengeStatus,
    verifyStatus,
    getLoginChallenge
  ]);

  return provider;
}
