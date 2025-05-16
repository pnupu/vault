# Solana Vault

A Next.js web application providing an interface to interact with a Solana vault program.

## Project Structure

This project is a monorepo containing:

*   A Next.js web application (in the root directory)
*   An Anchor-based Solana program (in the `program/vault-program/` directory)

## Tech Stack

### Frontend (Web Application)

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI**: [React](https://react.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Solana Interaction**:
    *   `@solana/web3.js`
    *   `@solana/wallet-adapter-react`
    *   `@coral-xyz/anchor` (for client-side interaction with the Anchor program)
*   **Data Fetching/State Management**:
    *   `@tanstack/react-query` (via tRPC)
    *   `@trpc/client`, `@trpc/react-query`, `@trpc/server`
*   **ORM**: [Prisma](https://www.prisma.io/) (likely for off-chain data)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)

### Backend (Solana Program)

*   **Framework**: [Anchor](https://www.anchor-lang.com/)
*   **Language**: Rust
*   **Location**: `program/vault-program/`

## Getting Started

### Prerequisites

*   Node.js (version specified in `.nvmrc` if present, or latest LTS)
*   Yarn (or npm)
*   Rust toolchain
*   Solana CLI
*   Anchor CLI

### 1. Frontend (Next.js App)

To run the web application:

```bash
# Navigate to the root directory if you aren't already there
# Install dependencies
yarn install
# or
npm install

# Run the development server
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 2. Solana Program (Anchor)

To build and deploy the Solana program:

```bash
# Navigate to the program directory
cd program/vault-program

# Install dependencies (if any specific to the program's JS/TS tooling)
yarn install
# or
npm install

# Build the program
anchor build

# Deploy the program (this will require a configured Solana CLI and wallet)
anchor deploy
```

Refer to the [Anchor documentation](https://www.anchor-lang.com/docs/cli) for more details on building, testing, and deploying Anchor programs.

## The Solana Vault Program

The core smart contract logic resides in `program/vault-program/programs/vault-program/src/lib.rs` (assuming standard Anchor structure). This program likely handles operations such as:

*   Deposit assets into the vault
*   Withdraw assets from the vault
*   Manage vault state and permissions

*(You should update this section with more specific details about your vault's functionality.)*

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
*(Consider adding more specific contribution guidelines, such as code style, testing requirements, etc.)*

## Acknowledgements

This project is based on or inspired by the work in the [ak8893893/solana-vault-program](https://github.com/ak8893893/solana-vault-program/tree/main) repository.

## License

This project is licensed under the terms of the license specified in the `LICENSE` file.
