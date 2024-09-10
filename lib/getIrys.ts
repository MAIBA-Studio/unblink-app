import Irys from "@irys/sdk";
import dotenv from "dotenv";
dotenv.config();

export const token = "solana";

export const getIrys = async () => {
  const network = process.env.BLOCKCHAIN_ENV ?? "devnet";
  const providerUrl = process.env.RPC_URL ?? "https://api.devnet.solana.com";

  const irys = new Irys({
    network, // URL of the node you want to connect to
    token, // Token used for payment
    key: process.env.ARWEAVE_UPLOADER_KEY, // SOL private key
    config: { providerUrl }, // Provider URL, only required when using Devnet
  });
  return irys;
};
