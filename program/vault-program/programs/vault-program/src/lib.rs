use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self, Token, TokenAccount, Mint, Transfer};

declare_id!("71eww9jmzMwBZ7kwqoovKZGeb54Mhvc5s3wtneQ1w8hp");

#[program]
pub mod vault_program {
    use super::*;

    pub fn initialize_config(ctx: Context<InitializeConfig>, admin: Pubkey, admin_investment_wallet: Pubkey) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.admin = admin;
        config.admin_investment_wallet = admin_investment_wallet;
        config.min_vault_balance = 0; // Default minimum balance
        config.investment_enabled = true; // Default to enabled
        Ok(())
    }

    pub fn update_admin(ctx: Context<UpdateAdmin>, new_admin: Pubkey) -> Result<()> {
        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.admin,
            VaultError::Unauthorized
        );
        ctx.accounts.config.admin = new_admin;
        Ok(())
    }

    pub fn update_admin_investment_wallet(ctx: Context<UpdateAdminWallet>, new_wallet: Pubkey) -> Result<()> {
        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.admin,
            VaultError::Unauthorized
        );
        ctx.accounts.config.admin_investment_wallet = new_wallet;
        Ok(())
    }

    pub fn initialize_user_metadata(ctx: Context<InitializeUserMetadata>) -> Result<()> {
        let metadata = &mut ctx.accounts.user_metadata;
        metadata.total_invested_sol = 0;
        metadata.total_invested_token = 0;
        metadata.last_investment_timestamp = 0;
        Ok(())
    }

    // SOL deposit
    pub fn deposit_sol(ctx: Context<DepositSol>, amount: u64) -> Result<()> {
        require!(amount > 0, VaultError::InvalidAmount);
        
        // Check if investment is enabled
        require!(
            ctx.accounts.config.investment_enabled,
            VaultError::InvestmentDisabled
        );

        // Verify the admin investment wallet matches config
        require!(
            ctx.accounts.admin_investment_wallet.key() == ctx.accounts.config.admin_investment_wallet,
            VaultError::InvalidAdminWallet
        );

        // Transfer directly to admin investment wallet
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.signer.to_account_info(),
                    to: ctx.accounts.admin_investment_wallet.to_account_info(),
                },
            ),
            amount,
        )?;

        // Update user metadata
        let user_metadata = &mut ctx.accounts.user_metadata;
        user_metadata.total_invested_sol = user_metadata.total_invested_sol.saturating_add(amount);
        user_metadata.last_investment_timestamp = Clock::get()?.unix_timestamp;
        
        ctx.accounts.user_interactions_counter.total_deposits += 1;
        Ok(())
    }

    // Token deposit
    pub fn deposit_token(ctx: Context<DepositToken>, amount: u64) -> Result<()> {
        require!(amount > 0, VaultError::InvalidAmount);
        
        // Check if direct deposit is enabled
        require!(
            ctx.accounts.config.investment_enabled,
            VaultError::InvestmentDisabled
        );

        // Verify the admin investment token account owner matches config
        require!(
            ctx.accounts.admin_token_account.owner == ctx.accounts.config.admin_investment_wallet,
            VaultError::InvalidAdminWallet
        );

        // Transfer directly to admin token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.admin_token_account.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        // Update user metadata
        let user_metadata = &mut ctx.accounts.user_metadata;
        user_metadata.total_invested_token = user_metadata.total_invested_token.saturating_add(amount);
        user_metadata.last_investment_timestamp = Clock::get()?.unix_timestamp;
        
        ctx.accounts.user_interactions_counter.total_deposits += 1;
        Ok(())
    }

    // SOL withdrawal
    pub fn withdraw_sol(ctx: Context<WithdrawSol>, amount: u64) -> Result<()> {
        require!(amount > 0, VaultError::InvalidAmount);

        let signer_key = ctx.accounts.signer.key();
        let seeds = &[
            b"vault".as_ref(),
            signer_key.as_ref(),
            &[ctx.bumps.user_vault_account],
        ];

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user_vault_account.key(),
            &ctx.accounts.signer.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke_signed(
            &ix,
            &[
                ctx.accounts.user_vault_account.to_account_info(),
                ctx.accounts.signer.to_account_info(),
            ],
            &[seeds],
        )?;

        ctx.accounts.user_interactions_counter.total_withdrawals += 1;
        Ok(())
    }

    // Token withdrawal
    pub fn withdraw_token(ctx: Context<WithdrawToken>, amount: u64) -> Result<()> {
        require!(amount > 0, VaultError::InvalidAmount);

        let mint_key = ctx.accounts.mint.key();
        let signer_key = ctx.accounts.signer.key();
        let vault_seeds = &[
            b"token_vault".as_ref(),
            mint_key.as_ref(),
            signer_key.as_ref(),
            &[ctx.bumps.vault_token_account],
        ];
        let seeds = &[&vault_seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.vault_token_account.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(
            cpi_program,
            cpi_accounts,
            seeds,
        );
        token::transfer(cpi_ctx, amount)?;

        ctx.accounts.user_interactions_counter.total_withdrawals += 1;
        Ok(())
    }

    pub fn invest_sol(ctx: Context<InvestSolToAdmin>, amount: u64) -> Result<()> {
        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.admin,
            VaultError::Unauthorized
        );

        require!(
            ctx.accounts.config.investment_enabled,
            VaultError::InvestmentDisabled
        );

        require!(amount > 0, VaultError::InvalidAmount);

        // Verify the admin investment wallet matches config
        require!(
            ctx.accounts.admin_investment_wallet.key() == ctx.accounts.config.admin_investment_wallet,
            VaultError::InvalidAdminWallet
        );

        let user_key = ctx.accounts.user.key();
        let vault_seeds = &[
            b"vault".as_ref(),
            user_key.as_ref(),
            &[ctx.bumps.user_vault_account],
        ];

        // Transfer directly to admin investment wallet
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user_vault_account.key(),
            &ctx.accounts.admin_investment_wallet.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke_signed(
            &ix,
            &[
                ctx.accounts.user_vault_account.to_account_info(),
                ctx.accounts.admin_investment_wallet.to_account_info(),
            ],
            &[vault_seeds],
        )?;

        let user_metadata = &mut ctx.accounts.user_metadata;
        user_metadata.total_invested_sol += amount;
        user_metadata.last_investment_timestamp = Clock::get()?.unix_timestamp;

        Ok(())
    }

    // Token investment
    pub fn invest_token(ctx: Context<InvestTokenToAdmin>, amount: u64) -> Result<()> {
        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.admin,
            VaultError::Unauthorized
        );

        require!(
            ctx.accounts.config.investment_enabled,
            VaultError::InvestmentDisabled
        );

        require!(amount > 0, VaultError::InvalidAmount);

        // Verify the admin investment token account owner matches config
        require!(
            ctx.accounts.admin_token_account.owner == ctx.accounts.config.admin_investment_wallet,
            VaultError::InvalidAdminWallet
        );

        let mint_key = ctx.accounts.mint.key();
        let user_key = ctx.accounts.user.key();
        let vault_seeds = &[
            b"token_vault".as_ref(),
            mint_key.as_ref(),
            user_key.as_ref(),
            &[ctx.bumps.vault_token_account],
        ];
        let seeds = &[&vault_seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.admin_token_account.to_account_info(),
            authority: ctx.accounts.vault_token_account.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(
            cpi_program,
            cpi_accounts,
            seeds,
        );
        token::transfer(cpi_ctx, amount)?;

        let user_metadata = &mut ctx.accounts.user_metadata;
        user_metadata.total_invested_token = user_metadata.total_invested_token.saturating_add(amount);
        user_metadata.last_investment_timestamp = Clock::get()?.unix_timestamp;

        Ok(())
    }

    // Return SOL investment
    pub fn return_sol_investment(ctx: Context<ReturnSolInvestmentFromAdmin>, amount: u64) -> Result<()> {
        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.admin,
            VaultError::Unauthorized
        );

        require!(amount > 0, VaultError::InvalidAmount);
        require!(
            amount <= ctx.accounts.user_metadata.total_invested_sol,
            VaultError::InvalidAmount
        );

        // Verify the admin investment wallet matches config
        require!(
            ctx.accounts.admin_investment_wallet.key() == ctx.accounts.config.admin_investment_wallet,
            VaultError::InvalidAdminWallet
        );

        // Create and initialize user vault account if needed
        let user_key = ctx.accounts.user.key();
        let _vault_seeds = &[
            b"vault".as_ref(),
            user_key.as_ref(),
            &[ctx.bumps.user_vault_account],
        ];

        // Transfer SOL from admin wallet to user vault account
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.admin_investment_wallet.to_account_info(),
                    to: ctx.accounts.user_vault_account.to_account_info(),
                },
            ),
            amount,
        )?;

        let user_metadata = &mut ctx.accounts.user_metadata;
        user_metadata.total_invested_sol = user_metadata.total_invested_sol.saturating_sub(amount);

        Ok(())
    }
    
    // Return token investment
    pub fn return_token_investment(ctx: Context<ReturnTokenInvestmentFromAdmin>, amount: u64) -> Result<()> {
        require!(
            ctx.accounts.signer.key() == ctx.accounts.config.admin,
            VaultError::Unauthorized
        );

        require!(amount > 0, VaultError::InvalidAmount);
        require!(
            amount <= ctx.accounts.user_metadata.total_invested_token,
            VaultError::InvalidAmount
        );

        // Verify the admin investment token account owner matches config
        require!(
            ctx.accounts.admin_token_account.owner == ctx.accounts.config.admin_investment_wallet,
            VaultError::InvalidAdminWallet
        );

        // Initialize user vault token account if needed
        let mint_key = ctx.accounts.mint.key();
        let user_key = ctx.accounts.user.key();
        let _vault_seeds = &[
            b"token_vault".as_ref(),
            mint_key.as_ref(),
            user_key.as_ref(),
            &[ctx.bumps.vault_token_account],
        ];

        // Transfer tokens from admin account to user vault token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.admin_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        let user_metadata = &mut ctx.accounts.user_metadata;
        user_metadata.total_invested_token = user_metadata.total_invested_token.saturating_sub(amount);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + VaultConfig::LEN,
        seeds = [b"config"],
        bump
    )]
    pub config: Account<'info, VaultConfig>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateAdmin<'info> {
    #[account(mut, seeds = [b"config"], bump)]
    pub config: Account<'info, VaultConfig>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateAdminWallet<'info> {
    #[account(mut, seeds = [b"config"], bump)]
    pub config: Account<'info, VaultConfig>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct InitializeUserMetadata<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + UserMetadata::LEN,
        seeds = [b"metadata", user.key().as_ref()],
        bump
    )]
    pub user_metadata: Account<'info, UserMetadata>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositSol<'info> {
    /// CHECK: This is the user's vault PDA, storing native SOL.
    #[account(mut, seeds=[b"vault", signer.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(init_if_needed, space = 16 + 8, seeds=[b"counter", signer.key().as_ref()], bump, payer = signer)]
    pub user_interactions_counter: Account<'info, UserInteractionsCounter>,
    #[account(mut, seeds=[b"metadata", signer.key().as_ref()], bump)]
    pub user_metadata: Account<'info, UserMetadata>,
    #[account(seeds=[b"config"], bump)]
    pub config: Account<'info, VaultConfig>,
    /// CHECK: This is the admin's investment wallet
    #[account(mut)]
    pub admin_investment_wallet: AccountInfo<'info>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositToken<'info> {
    #[account(
        init_if_needed,
        payer = signer,
        seeds = [b"token_vault", mint.key().as_ref(), signer.key().as_ref()],
        bump,
        token::mint = mint,
        token::authority = vault_token_account,
    )]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub admin_token_account: Account<'info, TokenAccount>,
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + UserInteractionsCounter::LEN,
        seeds = [b"counter", signer.key().as_ref()],
        bump
    )]
    pub user_interactions_counter: Account<'info, UserInteractionsCounter>,
    #[account(mut, seeds=[b"metadata", signer.key().as_ref()], bump)]
    pub user_metadata: Account<'info, UserMetadata>,
    #[account(seeds=[b"config"], bump)]
    pub config: Account<'info, VaultConfig>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct WithdrawSol<'info> {
    /// CHECK: This is the user's vault PDA, storing native SOL.
    #[account(mut, seeds=[b"vault", signer.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(mut, seeds=[b"counter", signer.key().as_ref()], bump)]
    pub user_interactions_counter: Account<'info, UserInteractionsCounter>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct WithdrawToken<'info> {
    #[account(
        mut,
        seeds = [b"token_vault", mint.key().as_ref(), signer.key().as_ref()],
        bump
    )]
    pub vault_token_account: Account<'info, TokenAccount>,
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_interactions_counter: Account<'info, UserInteractionsCounter>,
    pub signer: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct InvestSolToAdmin<'info> {
    /// CHECK: This is the user's vault PDA, storing native SOL.
    #[account(mut, seeds=[b"vault", user.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(mut, seeds=[b"metadata", user.key().as_ref()], bump)]
    pub user_metadata: Account<'info, UserMetadata>,
    #[account(seeds=[b"config"], bump)]
    pub config: Account<'info, VaultConfig>,
    /// CHECK: This is the admin's investment wallet
    #[account(mut)]
    pub admin_investment_wallet: AccountInfo<'info>,
    /// CHECK: User account, used only for vault PDA seeds.
    pub user: AccountInfo<'info>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InvestTokenToAdmin<'info> {
    #[account(
        mut,
        seeds = [b"token_vault", mint.key().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub admin_token_account: Account<'info, TokenAccount>,
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user_metadata: Account<'info, UserMetadata>,
    pub config: Account<'info, VaultConfig>,
    /// CHECK: We only use this for seeds
    pub user: UncheckedAccount<'info>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ReturnSolInvestmentFromAdmin<'info> {
    /// CHECK: This is the user's vault PDA, storing native SOL.
    #[account(mut, seeds=[b"vault", user.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(mut, seeds=[b"metadata", user.key().as_ref()], bump)]
    pub user_metadata: Account<'info, UserMetadata>,
    #[account(seeds=[b"config"], bump)]
    pub config: Account<'info, VaultConfig>,
    /// CHECK: This is the admin's investment wallet
    #[account(mut)]
    pub admin_investment_wallet: AccountInfo<'info>,
    /// CHECK: User account, used only for vault PDA seeds.
    pub user: AccountInfo<'info>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ReturnTokenInvestmentFromAdmin<'info> {
    #[account(
        mut,
        seeds = [b"token_vault", mint.key().as_ref(), user.key().as_ref()],
        bump
    )]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub admin_token_account: Account<'info, TokenAccount>,
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user_metadata: Account<'info, UserMetadata>,
    pub config: Account<'info, VaultConfig>,
    /// CHECK: We only use this for seeds
    pub user: UncheckedAccount<'info>,
    pub signer: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct VaultConfig {
    pub admin: Pubkey,
    pub admin_investment_wallet: Pubkey,
    pub min_vault_balance: u64,
    pub investment_enabled: bool,
}

impl VaultConfig {
    pub const LEN: usize = 32 + 32 + 8 + 1;
}

#[account]
pub struct UserInteractionsCounter {
    pub total_deposits: u64,
    pub total_withdrawals: u64,
}

impl UserInteractionsCounter {
    pub const LEN: usize = 8 + 8;
}

#[account]
pub struct UserMetadata {
    pub total_invested_sol: u64,
    pub total_invested_token: u64,
    pub last_investment_timestamp: i64,
}

impl UserMetadata {
    pub const LEN: usize = 8 + 8 + 8;
}

#[error_code]
pub enum VaultError {
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Investment is currently disabled")]
    InvestmentDisabled,
    #[msg("Invalid admin investment wallet")]
    InvalidAdminWallet,
}
