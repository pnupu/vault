import * as anchor from "@coral-xyz/anchor";
import { BN, Program, web3 } from "@coral-xyz/anchor";
import { VaultProgram } from "../target/types/vault_program";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { assert } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  transfer,
  Account as TokenAccountData, // Renamed to avoid conflict with anchor.Account
} from "@solana/spl-token";

describe("vault-program-usdc-tests", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VaultProgram as Program<VaultProgram>;

  // Create keypair for regular user
  const regularUser = Keypair.generate();

  // Calculate PDAs
  const [configPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    program.programId
  );

  const [userInteractionsCounter] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), regularUser.publicKey.toBuffer()],
    program.programId
  );

  const [userMetadata] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), regularUser.publicKey.toBuffer()],
    program.programId
  );

  // Devnet USDC Mint
  const usdcMintAddress = new PublicKey(
    "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
  );
  let userUsdcAta: TokenAccountData;
  let adminUsdcAta: TokenAccountData;

  // Get admin from config
  let admin: PublicKey;
  let adminKeypair: Keypair;

  const USDC_TRANSFER_AMOUNT = 0.005 * 10 ** 6; // 0.005 USDC (6 decimals)

  before(async () => {
    try {
      const requiredSolBalance = 0.5 * anchor.web3.LAMPORTS_PER_SOL;
      const providerBalance = await provider.connection.getBalance(
        provider.wallet.publicKey
      );
      console.log(
        "Provider wallet SOL balance:",
        providerBalance / anchor.web3.LAMPORTS_PER_SOL,
        "SOL"
      );
      assert.isAtLeast(
        providerBalance,
        requiredSolBalance,
        `Provider wallet needs at least ${
          requiredSolBalance / anchor.web3.LAMPORTS_PER_SOL
        } SOL`
      );

      const homeDir = os.homedir();
      const keypairPath = path.join(homeDir, ".config", "solana", "id.json");
      const keypairData = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
      adminKeypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
      admin = adminKeypair.publicKey;
      console.log("Using admin keypair:", admin.toBase58());

      // Initialize Config if it doesn't exist
      try {
        const config = await program.account.vaultConfig.fetch(configPda);
        console.log("Config exists with admin:", config.admin.toBase58());
        if (!config.admin.equals(admin)) {
          throw new Error(
            `Config admin mismatch. Deployed: ${config.admin.toBase58()}, Expected: ${admin.toBase58()}`
          );
        }
      } catch (err) {
        if ((err as Error).toString().includes("Account does not exist")) {
          console.log("Initializing config with admin:", admin.toBase58());
          await program.methods
            .initializeConfig(admin)
            // @ts-ignore
            .accounts({
              config: configPda,
              signer: provider.wallet.publicKey, // provider.wallet is the admin here for config init
              systemProgram: SystemProgram.programId,
            } as any)
            .rpc();
          const config = await program.account.vaultConfig.fetch(configPda);
          assert.ok(
            config.admin.equals(admin),
            "Config admin initialization failed"
          );
          console.log("Successfully initialized config.");
        } else {
          throw err;
        }
      }

      console.log(
        "Setting up USDC accounts using mint:",
        usdcMintAddress.toBase58()
      );

      // Get/Create ATAs for USDC
      adminUsdcAta = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        adminKeypair, // Payer
        usdcMintAddress,
        adminKeypair.publicKey
      );
      console.log("Admin USDC ATA:", adminUsdcAta.address.toBase58());

      userUsdcAta = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        adminKeypair, // Payer
        usdcMintAddress,
        regularUser.publicKey
      );
      console.log("User USDC ATA:", userUsdcAta.address.toBase58());

      // Check admin's USDC balance and transfer to user if sufficient
      const adminAtaInfo = await provider.connection.getAccountInfo(
        adminUsdcAta.address
      );
      console.log("Admin ATA raw lamports:", adminAtaInfo?.lamports);
      const adminUsdcBalance = await provider.connection.getTokenAccountBalance(
        adminUsdcAta.address
      );
      console.log(
        `Admin USDC balance: ${Number(
          adminUsdcBalance.value.uiAmountString
        )} USDC`
      );
      assert.isAtLeast(
        Number(adminUsdcBalance.value.amount),
        USDC_TRANSFER_AMOUNT,
        `Admin (${admin.toBase58()}) needs at least ${
          USDC_TRANSFER_AMOUNT / 10 ** 6
        } USDC in ${adminUsdcAta.address.toBase58()} on Devnet. Use a faucet like https://faucet.circle.com/`
      );

      await transfer(
        provider.connection,
        adminKeypair, // Payer
        adminUsdcAta.address, // Source
        userUsdcAta.address, // Destination
        adminKeypair.publicKey, // Authority for source
        USDC_TRANSFER_AMOUNT
      );
      console.log(
        `Transferred ${USDC_TRANSFER_AMOUNT / 10 ** 6} USDC from admin to user.`
      );

      // Fund regular user with some SOL for transaction fees
      const userSolFundingAmount = 0.1 * anchor.web3.LAMPORTS_PER_SOL;
      const userSolTransferTx = new anchor.web3.Transaction().add(
        anchor.web3.SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: regularUser.publicKey,
          lamports: userSolFundingAmount,
        })
      );
      await provider.sendAndConfirm(userSolTransferTx);
      const userSolBalance = await provider.connection.getBalance(
        regularUser.publicKey
      );
      assert.isAtLeast(
        userSolBalance,
        userSolFundingAmount,
        "Regular user SOL funding failed."
      );
      console.log("Funded regular user with SOL.");
    } catch (err) {
      console.error("Test setup failed:", err);
      throw err;
    }
  });

  it("Initialize regular user metadata for USDC tests", async () => {
    try {
      const metadataAccount = await provider.connection.getAccountInfo(
        userMetadata
      );
      if (metadataAccount) {
        console.log(
          "User metadata already initialized, skipping initialization for USDC tests."
        );
        const existingMetadata = await program.account.userMetadata.fetch(
          userMetadata
        );
        // Potentially reset token part if tests are run multiple times without reset
        if (existingMetadata.totalInvestedToken.gtn(0)) {
          console.warn(
            "Warning: User metadata shows existing token investment. This might affect test results if not intended."
          );
        }
        return;
      }
      await program.methods
        .initializeUserMetadata()
        // @ts-ignore
        .accounts({
          userMetadata,
          user: regularUser.publicKey,
          systemProgram: SystemProgram.programId,
        } as any)
        .signers([regularUser])
        .rpc();
      const metadata = await program.account.userMetadata.fetch(userMetadata);
      assert.equal(metadata.totalInvestedSol.toNumber(), 0);
      assert.equal(metadata.totalInvestedToken.toNumber(), 0);
      assert.equal(metadata.lastInvestmentTimestamp.toNumber(), 0);
      console.log("Initialized user metadata for USDC tests.");
    } catch (error) {
      console.error(
        "Failed to initialize user metadata for USDC tests:",
        error
      );
      throw error;
    }
  });

  // USDC Token Tests
  describe("USDC Token Operations", () => {
    let vaultUsdcTokenAccountPda: PublicKey;
    let investmentUsdcTokenAccountPda: PublicKey;

    before(async () => {
      [vaultUsdcTokenAccountPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("token_vault"),
          usdcMintAddress.toBuffer(),
          regularUser.publicKey.toBuffer(),
        ],
        program.programId
      );
      [investmentUsdcTokenAccountPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_investment_pool"), usdcMintAddress.toBuffer()],
        program.programId
      );
    });

    it("Regular user deposits USDC into vault", async () => {
      try {
        const amount = new BN(USDC_TRANSFER_AMOUNT); // Use the amount actually transferred
        const tx = await program.methods
          .depositToken(amount)
          .accounts({
            mint: usdcMintAddress,
            userTokenAccount: userUsdcAta.address,
            vaultTokenAccount: vaultUsdcTokenAccountPda,
            userInteractionsCounter,
            signer: regularUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID, // Though not directly used by program, often good practice for client
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();
        console.log("USDC deposit transaction:", tx);
        const vaultBalance = await provider.connection.getTokenAccountBalance(
          vaultUsdcTokenAccountPda
        );
        assert.equal(
          vaultBalance.value.amount,
          amount.toString(),
          "Vault USDC balance mismatch after deposit."
        );
      } catch (error) {
        console.error("Failed to deposit USDC:", error);
        throw error;
      }
    });

    it("Admin invests USDC from user's vault", async () => {
      try {
        const amount = new BN(USDC_TRANSFER_AMOUNT); // Invest the amount deposited
        const tx = await program.methods
          .investToken(amount)
          .accounts({
            mint: usdcMintAddress,
            vaultTokenAccount: vaultUsdcTokenAccountPda,
            investmentTokenAccount: investmentUsdcTokenAccountPda,
            userMetadata,
            config: configPda,
            user: regularUser.publicKey,
            signer: admin,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([adminKeypair])
          .rpc();
        console.log("USDC investment transaction:", tx);
        const metadata = await program.account.userMetadata.fetch(userMetadata);
        assert.equal(
          metadata.totalInvestedToken.toString(),
          amount.toString(),
          "Metadata invested USDC mismatch."
        );
        const investmentBalance =
          await provider.connection.getTokenAccountBalance(
            investmentUsdcTokenAccountPda
          );
        assert.equal(
          investmentBalance.value.amount,
          amount.toString(),
          "Investment pool USDC balance mismatch."
        );
      } catch (error) {
        console.error("Failed to invest USDC:", error);
        throw error;
      }
    });

    it("Admin returns USDC investment to user's vault", async () => {
      try {
        const metadataBefore = await program.account.userMetadata.fetch(
          userMetadata
        );
        const amountToReturn = new BN(
          metadataBefore.totalInvestedToken.toString()
        );
        assert.ok(
          amountToReturn.gtn(0),
          "Amount to return should be greater than zero."
        );

        const tx = await program.methods
          .returnTokenInvestment(amountToReturn)
          .accounts({
            mint: usdcMintAddress,
            vaultTokenAccount: vaultUsdcTokenAccountPda,
            investmentTokenAccount: investmentUsdcTokenAccountPda,
            userMetadata,
            config: configPda,
            user: regularUser.publicKey,
            signer: admin,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([adminKeypair])
          .rpc();
        console.log("Return USDC investment transaction:", tx);
        const metadataAfter = await program.account.userMetadata.fetch(
          userMetadata
        );
        assert.equal(
          metadataAfter.totalInvestedToken.toString(),
          "0",
          "Metadata invested USDC should be zero after return."
        );
        const vaultBalance = await provider.connection.getTokenAccountBalance(
          vaultUsdcTokenAccountPda
        );
        // Assuming initial deposit was USDC_TRANSFER_AMOUNT, invested all, returned all. So vault should have USDC_TRANSFER_AMOUNT.
        assert.equal(
          vaultBalance.value.amount,
          new BN(USDC_TRANSFER_AMOUNT).toString(),
          "Vault USDC balance mismatch after investment return."
        );
      } catch (error) {
        console.error("Failed to return USDC investment:", error);
        throw error;
      }
    });

    it("Regular user withdraws USDC from vault", async () => {
      try {
        const amount = new BN(USDC_TRANSFER_AMOUNT); // Withdraw the amount present
        const tx = await program.methods
          .withdrawToken(amount)
          .accounts({
            mint: usdcMintAddress,
            userTokenAccount: userUsdcAta.address,
            vaultTokenAccount: vaultUsdcTokenAccountPda,
            userInteractionsCounter,
            signer: regularUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();
        console.log("USDC withdrawal transaction:", tx);
        const vaultBalance = await provider.connection.getTokenAccountBalance(
          vaultUsdcTokenAccountPda
        );
        assert.equal(
          vaultBalance.value.amount,
          "0",
          "Vault USDC should be zero after withdrawal."
        );
        const userAtaBalance = await provider.connection.getTokenAccountBalance(
          userUsdcAta.address
        );
        assert.equal(
          userAtaBalance.value.amount,
          USDC_TRANSFER_AMOUNT.toString(),
          "User USDC ATA balance mismatch after withdrawal."
        ); // Back to initial transfer amount
      } catch (error) {
        console.error("Failed to withdraw USDC:", error);
        throw error;
      }
    });

    it("Fails to invest USDC as non-admin", async () => {
      try {
        const amount = new BN(USDC_TRANSFER_AMOUNT); // 1 USDC
        // First, ensure there are funds to attempt to invest by depositing again
        await program.methods
          .depositToken(amount)
          .accounts({
            mint: usdcMintAddress,
            userTokenAccount: userUsdcAta.address,
            vaultTokenAccount: vaultUsdcTokenAccountPda,
            userInteractionsCounter,
            signer: regularUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();

        await program.methods
          .investToken(amount)
          .accounts({
            mint: usdcMintAddress,
            vaultTokenAccount: vaultUsdcTokenAccountPda,
            investmentTokenAccount: investmentUsdcTokenAccountPda,
            userMetadata,
            config: configPda,
            user: regularUser.publicKey,
            signer: regularUser.publicKey, // Attempting to sign as non-admin
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();
        assert.fail("Expected USDC investment by non-admin to fail.");
      } catch (err) {
        assert.include(
          // @ts-ignore
          err.toString(),
          "Unauthorized",
          "Error message should indicate unauthorized access."
        );
        // Clean up the deposit made for this test
        const amountToWithdraw = new BN(USDC_TRANSFER_AMOUNT);
        await program.methods
          .withdrawToken(amountToWithdraw)
          .accounts({
            mint: usdcMintAddress,
            userTokenAccount: userUsdcAta.address,
            vaultTokenAccount: vaultUsdcTokenAccountPda,
            userInteractionsCounter,
            signer: regularUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();
      }
    });
  });
});
