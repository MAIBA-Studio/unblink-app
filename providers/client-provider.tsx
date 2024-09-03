"use client";

import { HARDCODED_WALLET_STANDARDS, metadata } from "@/lib/constants/wallets";
import {
  Adapter,
  ConnectionProvider,
  UnifiedWalletProvider,
  WalletAdapterNetwork,
} from "@jup-ag/wallet-adapter";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode;
};

export const ClientProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();

  const wallets = useMemo(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return [new PhantomWalletAdapter(), new SolflareWalletAdapter()].filter(
      (item) => item && item.name && item.icon
    ) as Adapter[];
  }, []);

  const unifiedWalletProviderParams: Omit<
    Parameters<typeof UnifiedWalletProvider>[0],
    "children"
  > = useMemo(
    () => ({
      wallets: wallets,
      config: {
        autoConnect: true,
        env:
          process.env.NEXT_PUBLIC_BLOCKCHAIN_ENV === "devnet"
            ? WalletAdapterNetwork.Devnet
            : WalletAdapterNetwork.Mainnet,
        metadata,
        hardcodedWallets: HARDCODED_WALLET_STANDARDS,
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
        theme: "dark",
        lang: "en",
      },
    }),
    [wallets]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider
        endpoint={process.env.NEXT_PUBLIC_RPC_URL ?? ""}
        config={{
          confirmTransactionInitialTimeout: 30000,
          commitment: "processed",
          disableRetryOnRateLimit: true,
        }}
      >
        <UnifiedWalletProvider {...unifiedWalletProviderParams}>
          {children}
        </UnifiedWalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};
