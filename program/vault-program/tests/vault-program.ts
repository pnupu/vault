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
  createMint,
  createAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";

describe("vault-program", () => {
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

  // Regular user's accounts
  const [userVaultAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), regularUser.publicKey.toBuffer()],
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

  // Get investment pool PDA
  const [investmentPool] = PublicKey.findProgramAddressSync(
    [Buffer.from("investment_pool")],
    program.programId
  );

  // Token test variables
  let testMint: PublicKey;
  let userTokenAccount: PublicKey;
  let adminTokenAccount: PublicKey;

  // Get admin from config
  let admin: PublicKey;
  let adminKeypair: Keypair;

  // Check provider wallet balance and get admin from config
  before(async () => {
    try {
      const requiredBalance = 1 * anchor.web3.LAMPORTS_PER_SOL; // 1 SOL needed for deployment, tests, and token setup

      // Check current balance
      const balance = await provider.connection.getBalance(
        provider.wallet.publicKey
      );
      console.log(
        "Provider wallet balance:",
        balance / anchor.web3.LAMPORTS_PER_SOL,
        "SOL"
      );

      // Verify we have enough SOL
      assert.isAtLeast(
        balance,
        requiredBalance,
        `Provider wallet needs at least ${
          requiredBalance / anchor.web3.LAMPORTS_PER_SOL
        } SOL for testing`
      );

      // Load admin keypair from default Solana config
      try {
        const homeDir = os.homedir();
        const keypairPath = path.join(homeDir, ".config", "solana", "id.json");
        const keypairData = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
        adminKeypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
        admin = adminKeypair.publicKey;
        console.log("Using keypair:", admin.toBase58());

        // Check if config exists
        try {
          const config = await program.account.vaultConfig.fetch(configPda);
          console.log("Config exists with admin:", config.admin.toBase58());

          if (!config.admin.equals(admin)) {
            throw new Error(
              `Config exists with different admin. Expected ${admin.toBase58()} but got ${config.admin.toBase58()}`
            );
          }
        } catch (err) {
          if (err.toString().includes("Account does not exist")) {
            console.log("Initializing config with admin:", admin.toBase58());
            const tx = await program.methods
              .initializeConfig(admin)
              .accounts({
                config: configPda,
                signer: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
              } as any)
              .rpc();
            console.log("Initialized config:", tx);

            const config = await program.account.vaultConfig.fetch(configPda);
            if (!config.admin.equals(admin)) {
              throw new Error(`Config admin mismatch`);
            }
            console.log(
              "Successfully initialized config with our keypair as admin"
            );
          } else {
            throw err;
          }
        }

        // Create test token mint and accounts
        console.log("Creating test token mint and accounts...");
        testMint = await createMint(
          provider.connection,
          adminKeypair,
          adminKeypair.publicKey,
          null,
          6 // 6 decimals like USDC
        );
        console.log("Test mint created:", testMint.toBase58());

        // Create token accounts
        userTokenAccount = await createAssociatedTokenAccount(
          provider.connection,
          adminKeypair,
          testMint,
          regularUser.publicKey
        );
        console.log("User token account created:", userTokenAccount.toBase58());

        adminTokenAccount = await createAssociatedTokenAccount(
          provider.connection,
          adminKeypair,
          testMint,
          adminKeypair.publicKey
        );
        console.log(
          "Admin token account created:",
          adminTokenAccount.toBase58()
        );

        // Mint some tokens to user
        await mintTo(
          provider.connection,
          adminKeypair,
          testMint,
          userTokenAccount,
          adminKeypair,
          1000000000 // 1000 tokens with 6 decimals
        );
        console.log("Minted test tokens to user");
      } catch (err) {
        throw new Error(`Failed to setup test environment: ${err.message}`);
      }
    } catch (error) {
      console.error("Failed to setup test environment:", error);
      throw error;
    }
  });

  // Fund regular user account
  before(async () => {
    try {
      const userFundingAmount = 0.1 * anchor.web3.LAMPORTS_PER_SOL;
      const balance = await provider.connection.getBalance(
        provider.wallet.publicKey
      );
      assert.isAtLeast(balance, userFundingAmount);

      const userTransferTx = new anchor.web3.Transaction().add(
        anchor.web3.SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: regularUser.publicKey,
          lamports: userFundingAmount,
        })
      );
      await provider.sendAndConfirm(userTransferTx);

      const userBalance = await provider.connection.getBalance(
        regularUser.publicKey
      );
      assert.isAtLeast(userBalance, userFundingAmount);
    } catch (error) {
      console.error("Failed to fund user account:", error);
      throw error;
    }
  });

  it("Regular user deposits into vault", async () => {
    try {
      const amount = new anchor.BN(0.01 * anchor.web3.LAMPORTS_PER_SOL);

      // Get initial balance
      const initialBalance = await provider.connection.getBalance(
        userVaultAccount
      );

      const tx = await program.methods
        .depositSol(amount)
        .accounts({
          // @ts-ignore
          userVaultAccount,
          userInteractionsCounter,
          signer: regularUser.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([regularUser])
        .rpc();

      console.log("Deposit transaction:", tx);

      const balance = await provider.connection.getBalance(userVaultAccount);
      assert.equal(balance, initialBalance + amount.toNumber());
    } catch (error) {
      console.error("Failed to deposit:", error);
      throw error;
    }
  });

  it("Initialize regular user metadata", async () => {
    try {
      // Check if metadata already exists
      const metadataAccount = await provider.connection.getAccountInfo(
        userMetadata
      );
      if (metadataAccount) {
        console.log(
          "User metadata already initialized, skipping initialization"
        );
        return;
      }

      const tx = await program.methods
        .initializeUserMetadata()
        .accounts({
          // @ts-ignore
          userMetadata,
          user: regularUser.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([regularUser])
        .rpc();

      console.log("Initialize user metadata transaction:", tx);

      const metadata = await program.account.userMetadata.fetch(userMetadata);
      assert.equal(metadata.totalInvestedSol.toNumber(), 0);
      assert.equal(metadata.totalInvestedToken.toNumber(), 0);
      assert.equal(metadata.lastInvestmentTimestamp.toNumber(), 0);
    } catch (error) {
      console.error("Failed to initialize user metadata:", error);
      throw error;
    }
  });

  it("Admin invests funds from regular user's vault", async () => {
    try {
      const amount = new anchor.BN(0.005 * anchor.web3.LAMPORTS_PER_SOL);

      const tx = await program.methods
        .investSol(amount)
        .accounts({
          // @ts-ignore
          userVaultAccount,
          userMetadata,
          config: configPda,
          investmentPool,
          user: regularUser.publicKey,
          signer: admin,
          systemProgram: SystemProgram.programId,
        })
        .signers([adminKeypair])
        .rpc();

      console.log("Invest funds transaction:", tx);

      const metadata = await program.account.userMetadata.fetch(userMetadata);
      assert.equal(metadata.totalInvestedSol.toNumber(), amount.toNumber());
      assert.isAbove(metadata.lastInvestmentTimestamp.toNumber(), 0);

      const balance = await provider.connection.getBalance(investmentPool);
      assert.equal(balance, amount.toNumber());
    } catch (error) {
      console.error("Failed to invest funds:", error);
      throw error;
    }
  });

  it("Admin returns investment to user's vault", async () => {
    try {
      // Get initial balances
      const initialVaultBalance = await provider.connection.getBalance(
        userVaultAccount
      );
      const initialMetadata = await program.account.userMetadata.fetch(
        userMetadata
      );
      const amount = new anchor.BN(initialMetadata.totalInvestedSol.toNumber());

      const tx = await program.methods
        .returnSolInvestment(amount)
        .accounts({
          // @ts-ignore
          userVaultAccount,
          userMetadata,
          config: configPda,
          investmentPool,
          user: regularUser.publicKey,
          signer: admin,
          systemProgram: SystemProgram.programId,
        })
        .signers([adminKeypair])
        .rpc();

      console.log("Return investment transaction:", tx);

      // Verify the vault balance increased
      const finalVaultBalance = await provider.connection.getBalance(
        userVaultAccount
      );
      assert.equal(finalVaultBalance, initialVaultBalance + amount.toNumber());

      // Verify the metadata was updated
      const finalMetadata = await program.account.userMetadata.fetch(
        userMetadata
      );
      assert.equal(finalMetadata.totalInvestedSol.toNumber(), 0);
    } catch (error) {
      console.error("Failed to return investment:", error);
      throw error;
    }
  });

  it("Fail to invest funds (as non-admin)", async () => {
    try {
      const amount = new anchor.BN(0.005 * anchor.web3.LAMPORTS_PER_SOL);

      await program.methods
        .investSol(amount)
        .accounts({
          // @ts-ignore
          userVaultAccount,
          userMetadata,
          config: configPda,
          investmentPool,
          user: regularUser.publicKey,
          signer: regularUser.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([regularUser])
        .rpc();
      assert.fail("Expected transaction to fail");
    } catch (err) {
      assert.include(err.toString(), "Unauthorized");
    }
  });

  it("Regular user withdraws from vault", async () => {
    try {
      const amount = new anchor.BN(0.004 * anchor.web3.LAMPORTS_PER_SOL);

      // Get initial balance
      const initialBalance = await provider.connection.getBalance(
        userVaultAccount
      );

      const tx = await program.methods
        .withdrawSol(amount)
        .accounts({
          // @ts-ignore
          userVaultAccount,
          userInteractionsCounter,
          signer: regularUser.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([regularUser])
        .rpc();

      console.log("Withdraw transaction:", tx);

      const balance = await provider.connection.getBalance(userVaultAccount);
      assert.equal(balance, initialBalance - amount.toNumber());
    } catch (error) {
      console.error("Failed to withdraw:", error);
      throw error;
    }
  });

  it("Fail to deposit zero amount", async () => {
    try {
      const amount = new anchor.BN(0);

      await program.methods
        .depositSol(amount)
        .accounts({
          // @ts-ignore
          userVaultAccount,
          userInteractionsCounter,
          signer: regularUser.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([regularUser])
        .rpc();
      assert.fail("Expected transaction to fail");
    } catch (err) {
      assert.include(err.toString(), "Invalid amount");
    }
  });

  // New Token Tests
  describe("Token Operations", () => {
    let vaultTokenAccount: PublicKey;
    let investmentTokenAccount: PublicKey;

    before(async () => {
      // Calculate token PDAs
      [vaultTokenAccount] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("token_vault"),
          testMint.toBuffer(),
          regularUser.publicKey.toBuffer(),
        ],
        program.programId
      );

      [investmentTokenAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_investment_pool"), testMint.toBuffer()],
        program.programId
      );
    });

    it("Regular user deposits tokens into vault", async () => {
      try {
        const amount = new BN(1000000); // 1 token with 6 decimals

        const tx = await program.methods
          .depositToken(amount)
          .accounts({
            mint: testMint,
            userTokenAccount,
            vaultTokenAccount,
            userInteractionsCounter,
            signer: regularUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();

        console.log("Token deposit transaction:", tx);

        // Verify the deposit
        const vaultBalance = await provider.connection.getTokenAccountBalance(
          vaultTokenAccount
        );
        assert.equal(vaultBalance.value.amount, amount.toString());
      } catch (error) {
        console.error("Failed to deposit tokens:", error);
        throw error;
      }
    });

    it("Admin invests tokens from user's vault", async () => {
      try {
        const amount = new BN(500000); // 0.5 tokens

        const tx = await program.methods
          .investToken(amount)
          .accounts({
            mint: testMint,
            vaultTokenAccount,
            investmentTokenAccount,
            userMetadata,
            config: configPda,
            user: regularUser.publicKey,
            signer: admin,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([adminKeypair])
          .rpc();

        console.log("Token investment transaction:", tx);

        // Verify the investment
        const metadata = await program.account.userMetadata.fetch(userMetadata);
        assert.equal(metadata.totalInvestedToken.toString(), amount.toString());

        const investmentBalance =
          await provider.connection.getTokenAccountBalance(
            investmentTokenAccount
          );
        assert.equal(investmentBalance.value.amount, amount.toString());
      } catch (error) {
        console.error("Failed to invest tokens:", error);
        throw error;
      }
    });

    it("Admin returns token investment to user's vault", async () => {
      try {
        const metadata = await program.account.userMetadata.fetch(userMetadata);
        const amount = new BN(metadata.totalInvestedToken.toString());

        const tx = await program.methods
          .returnTokenInvestment(amount)
          .accounts({
            mint: testMint,
            vaultTokenAccount,
            investmentTokenAccount,
            userMetadata,
            config: configPda,
            user: regularUser.publicKey,
            signer: admin,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([adminKeypair])
          .rpc();

        console.log("Return token investment transaction:", tx);

        // Verify the return
        const finalMetadata = await program.account.userMetadata.fetch(
          userMetadata
        );
        assert.equal(finalMetadata.totalInvestedToken.toString(), "0");

        const vaultBalance = await provider.connection.getTokenAccountBalance(
          vaultTokenAccount
        );
        assert.equal(vaultBalance.value.amount, "1000000"); // Should be back to original 1 token
      } catch (error) {
        console.error("Failed to return token investment:", error);
        throw error;
      }
    });

    it("Regular user withdraws tokens from vault", async () => {
      try {
        const amount = new BN(1000000); // Withdraw all tokens

        const tx = await program.methods
          .withdrawToken(amount)
          .accounts({
            mint: testMint,
            userTokenAccount,
            vaultTokenAccount,
            userInteractionsCounter,
            signer: regularUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();

        console.log("Token withdrawal transaction:", tx);

        // Verify the withdrawal
        const vaultBalance = await provider.connection.getTokenAccountBalance(
          vaultTokenAccount
        );
        assert.equal(vaultBalance.value.amount, "0");

        const userBalance = await provider.connection.getTokenAccountBalance(
          userTokenAccount
        );
        assert.equal(userBalance.value.amount, "1000000000"); // Back to original balance
      } catch (error) {
        console.error("Failed to withdraw tokens:", error);
        throw error;
      }
    });

    it("Fails to invest tokens as non-admin", async () => {
      try {
        const amount = new BN(500000);

        await program.methods
          .investToken(amount)
          .accounts({
            mint: testMint,
            vaultTokenAccount,
            investmentTokenAccount,
            userMetadata,
            config: configPda,
            user: regularUser.publicKey,
            signer: regularUser.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          } as any)
          .signers([regularUser])
          .rpc();

        assert.fail("Expected transaction to fail");
      } catch (err) {
        assert.include(err.toString(), "Unauthorized");
      }
    });
  });
});
