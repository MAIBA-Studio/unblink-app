declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_NODE_ENV: "development" | "staging" | "production" | "local";
    NEXT_PUBLIC_BLOCKCHAIN_ENV: "devnet" | "testnet" | "mainnet";
    BLOCKCHAIN_ENV: "devnet" | "testnet" | "mainnet";
    NEXT_PUBLIC_RPC_URL: string;
    RPC_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_ADMIN_KEY: string;
    DATABASE_URL: string;
    NEXT_PUBLIC_IRYS_RPC_URL: string;
    ARWEAVE_UPLOADER_KEY: string;
    WALLET_DEPLOYER: string;
    MINT_SIGNER: string;
  }
}
