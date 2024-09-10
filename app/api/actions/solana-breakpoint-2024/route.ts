import {
  SOLANA_BREAKPOINT_2024_COLLECTION_MINT_DEVNET,
  SOLANA_BREAKPOINT_2024_MERKLE_TREE_DEVNET,
  UNBLINK_CREATOR_DEVNET,
} from "@/lib/constants/addresses";
import {
  mintToCollectionV1,
  mplBubblegum,
} from "@metaplex-foundation/mpl-bubblegum";
import {
  createNoopSigner,
  publicKey,
  signerIdentity,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  fromWeb3JsPublicKey,
  toWeb3JsTransaction,
} from "@metaplex-foundation/umi-web3js-adapters";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import { PublicKey } from "@solana/web3.js";

export const GET = (req: Request) => {
  const payload: ActionGetResponse = {
    icon: new URL(
      "/assets/logo/logo-only.png",
      new URL(req.url).origin
    ).toString(),
    label: "Mint the moment!",
    description: "Mint your moment during Solana Breakpoint 2024 in Singapore!",
    title: "Solana Breakpoint 2024 by UnBlink",
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return Response.json("Invalid account provided.", {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    /**
     * TODO:
     * NOTE: Each booth sponsor should have their own API endpoint for minting, this is just a POC template
     * 1. Fetch the image from the Supabase Database together with other metadata
     * 2. x Upload the image to Arweave
     * 3. x Construct the metadata object and upload to Arweave
     * 4. / Mint the cNFT to the collection
     * 5. / Build the payload with solana/actions
     * 6. / Return the payload with headers
     */

    const collectionMint = publicKey(
      SOLANA_BREAKPOINT_2024_COLLECTION_MINT_DEVNET
    );

    const signer = createNoopSigner(fromWeb3JsPublicKey(account));
    const RPC_ENDPOINT = process.env.RPC_URL || "https://api.devnet.solana.com";
    const umi = createUmi(RPC_ENDPOINT);
    umi.use(mplBubblegum());
    umi.use(signerIdentity(signer));

    const mint = mintToCollectionV1(umi, {
      leafOwner: fromWeb3JsPublicKey(account), // wallet of the minter
      merkleTree: publicKey(SOLANA_BREAKPOINT_2024_MERKLE_TREE_DEVNET), // address of the merkle tree
      collectionMint,
      metadata: {
        name: "Unblink - Solana Breakpoint 2024",
        uri: "https://gateway.irys.xyz/4meq9njNhgZCXiN8TtfTu5E9temiSJ2DbaBhjyvYN8HC",
        sellerFeeBasisPoints: 500, // 5%
        collection: { key: collectionMint, verified: true },
        creators: [
          {
            address: publicKey(UNBLINK_CREATOR_DEVNET),
            verified: true,
            share: 100,
          },
        ],
      },
    });

    let tx = await transactionBuilder().add(mint).buildWithLatestBlockhash(umi);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction: toWeb3JsTransaction(tx),
      },
    });

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    console.log("error =>", err);
    return Response.json("An unknown error occured.", {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
