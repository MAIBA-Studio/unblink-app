import { createTree, mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { ValidDepthSizePair } from "@solana/spl-account-compression";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
import { numberFormatter } from "./utils";
dotenv.config();

// tsx "scripts/init_cnft_tree.ts"

// define some reusable balance values for tracking
let initBalance: number, balance: number;

// TODO: Change this on production

(async () => {
  const wallet = JSON.parse(process.env.WALLET_DEPLOYER || "{}");
  const RPC_ENDPOINT = process.env.RPC_URL || "https://api.devnet.solana.com";
  const umi = createUmi(RPC_ENDPOINT).use(mplBubblegum());

  let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
  const myKeypairSigner = createSignerFromKeypair(umi, keypair);
  umi.use(signerIdentity(myKeypairSigner));
  umi.use(mplTokenMetadata());

  const connection = new Connection(RPC_ENDPOINT, "confirmed");

  // get the payer's starting balance (only used for demonstration purposes)
  initBalance = await connection.getBalance(new PublicKey(keypair.publicKey));

  console.log("Creating create tree...");

  const merkleTree = generateSigner(umi);

  /*
    Define our tree size parameters
  */
  // TODO: Change depending on event
  const maxDepthSizePair: ValidDepthSizePair = {
    maxDepth: 15,
    maxBufferSize: 64,
  };
  const canopyDepth = maxDepthSizePair.maxDepth - 3;

  const builder = await createTree(umi, {
    merkleTree,
    public: true,
    canopyDepth,
    ...maxDepthSizePair,
  });

  let createResult = await builder.sendAndConfirm(umi);
  const signature = base58.deserialize(createResult.signature);
  console.log(`Succesfully Created Tree! Signature: ${signature[0]}`);
  console.log("Merkle Tree: ", merkleTree.publicKey);

  // fetch the payer's final balance
  balance = await connection.getBalance(new PublicKey(keypair.publicKey));

  console.log(
    "Total cost:",
    numberFormatter((initBalance - balance) / LAMPORTS_PER_SOL, true),
    "SOL\n"
  );

  // https://explorer.solana.com/tx/3PLZiN3ShXUMFE2KiAd42JNxmMeAiSbX6wvj9TkgaA9sw86kD2V9kfsP4paoAg3frvbUsFsFyPav4XYCrCaETB4v?cluster=devnet
  // Merkle Tree Address: D92UVn1SBHGwscTEHLt7XaKA2mf5Vbz5FJGXbdLQ5AU4
})();
