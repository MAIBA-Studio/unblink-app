import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Connection, clusterApiUrl } from "@solana/web3.js";

interface IConfig {
  cluster: WalletAdapterNetwork;
  rpcUrl: string;
  connection: Connection;
  treasuryAddress: string;
}

interface IBlockchainConfig {
  [key: string]: IConfig;
}

const config: IBlockchainConfig = {
  devnet: {
    cluster: WalletAdapterNetwork.Devnet,
    rpcUrl:
      process.env.NEXT_PUBLIC_DEVNET_RPC_URL ||
      clusterApiUrl(WalletAdapterNetwork.Devnet),
    connection: new Connection(
      process.env.NEXT_PUBLIC_DEVNET_RPC_URL ||
        clusterApiUrl(WalletAdapterNetwork.Devnet),
      "finalized"
    ),
    // Token
    treasuryAddress: "AFRLjPK3auBuFe9aZAjmZA39NoVbjDuitsZbELjuZzda",
  },
  mainnet: {
    cluster: WalletAdapterNetwork.Mainnet,
    rpcUrl:
      process.env.NEXT_PUBLIC_RPC_URL ||
      clusterApiUrl(WalletAdapterNetwork.Mainnet),
    connection: new Connection(
      process.env.NEXT_PUBLIC_RPC_URL ||
        clusterApiUrl(WalletAdapterNetwork.Mainnet),
      "finalized"
    ),
    treasuryAddress: "",
  },
};

const useSolanaConfig = () => {
  const env =
    process.env.NEXT_PUBLIC_BLOCKCHAIN_ENV === "mainnet" ? "mainnet" : "devnet";
  return config[env] as IConfig;
};

export default useSolanaConfig;
