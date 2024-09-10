import { Uploader } from "@irys/upload";
import { Solana } from "@irys/upload-solana";
import dotenv from "dotenv";
dotenv.config();

export const getIrysUploader = async () => {
  const irysUploader = await Uploader(Solana)
    .withWallet(process.env.ARWEAVE_UPLOADER_KEY)
    .withRpc(process.env.RPC_URL)
    // .withRpc("https://api.devnet.solana.com")
    .devnet();

  return irysUploader;
};
