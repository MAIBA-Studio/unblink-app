import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import {
  createV1,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { base58 } from "@metaplex-foundation/umi/serializers";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const wallet = JSON.parse(process.env.WALLET_DEPLOYER || "{}");
  const RPC_ENDPOINT = process.env.RPC_URL || "https://api.devnet.solana.com";
  const umi = createUmi(RPC_ENDPOINT).use(mplBubblegum());

  let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
  const myKeypairSigner = createSignerFromKeypair(umi, keypair);
  umi.use(signerIdentity(myKeypairSigner));
  umi.use(mplTokenMetadata());

  /*
    Create the actual NFT collection (using the normal Metaplex method)
    (nothing special about compression here)
  */

  //   TODO: Update to unblink creator from the configs
  const unblinkCreator = publicKey(
    "AqtqBLXk4NGppf5qBWgC6PSLrqEqdB2ECzWh4hVJ2qQN"
  );

  const mint = generateSigner(umi);

  // create a full token mint and initialize the collection (with the `payer` as the authority)
  const res = await createV1(umi, {
    mint,
    authority: wallet.publicKey,
    name: "Unblink - Solana Breakpoint 2024",
    uri: "https://gateway.irys.xyz/2WFXXw8dZzehTjzMQs1VRcBZzvyCa2uePS1V4pQWCgKc",
    sellerFeeBasisPoints: percentAmount(5.5),
    creators: [
      {
        address: unblinkCreator,
        verified: true,
        share: 100,
      },
    ],
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  const signature = base58.deserialize(res.signature);
  console.log(`Succesfully Created a Collection Mint! Mint: ${mint.publicKey}`);
  console.log(`Tx: ${signature[0]}`);

  // tsx "scripts/init_collection_mint.ts"

  /**
   * Devnet - H172SHXwhjH2CfxA2KWrZaozAdVaBZTkqBuoSXeQMLZH
   * Mainnet -
   */
})();
