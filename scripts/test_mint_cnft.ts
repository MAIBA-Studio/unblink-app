import {
  mintToCollectionV1,
  mplBubblegum,
} from "@metaplex-foundation/mpl-bubblegum";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
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

  //   TODO: Update to unblink creator from the configs
  const unblinkCreator = publicKey(
    "AqtqBLXk4NGppf5qBWgC6PSLrqEqdB2ECzWh4hVJ2qQN"
  );
  const collectionMint = publicKey(
    "H172SHXwhjH2CfxA2KWrZaozAdVaBZTkqBuoSXeQMLZH"
  );

  const tx = await mintToCollectionV1(umi, {
    leafOwner: publicKey("AqtqBLXk4NGppf5qBWgC6PSLrqEqdB2ECzWh4hVJ2qQN"), // wallet of the minter
    merkleTree: publicKey("MvFM3Nxp3k6C79E6q6q259aF45UAL2DF9uJLhWPvfKR"), // address of the merkle tree
    collectionMint,
    metadata: {
      name: "Unblink - Solana Breakpoint 2024",
      uri: "https://gateway.irys.xyz/4meq9njNhgZCXiN8TtfTu5E9temiSJ2DbaBhjyvYN8HC",
      sellerFeeBasisPoints: 500, // 5%
      collection: { key: collectionMint, verified: true },
      creators: [{ address: unblinkCreator, verified: true, share: 100 }],
    },
  }).sendAndConfirm(umi);

  const signature = base58.deserialize(tx.signature);
  console.log(`Succesfully Minted cNFT! Signature: ${signature[0]}`);

  // tsx "scripts/test_mint_cnft.ts"

  /**
   * Devnet - https://explorer.solana.com/tx/kKt2scfawyfj1ZdZHSwsZhVN66cfjAzMZrkyTstrXQErL7Y5oCWLQzcW99rd78mAdhe4psgphFhWqJh1XDTPuMa
   * Mainnet -
   */
})();
