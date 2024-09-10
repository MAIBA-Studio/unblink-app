import { getIrys } from "@/lib/getIrys";
import dotenv from "dotenv";
dotenv.config();

const upload = async () => {
  const irys = await getIrys();

  const collectionMetadata = `{
    "name": "Unblink at Solana Breakpoint 2024",
    "description": "Mint the moment. Capture life's authentic moments, mint them as unique NFTs on Solana, and earn royalties through shared, unfiltered photographic experiences.",
    "image": "https://gateway.irys.xyz/AVQbXkMRdQRXPUBio9oeyyYTvYbZRojnT4xFdhTpMqa1",
    "external_url": "https://unblink.app/",
    "properties": {
      "files": [
        {
          "uri": "https://gateway.irys.xyz/AVQbXkMRdQRXPUBio9oeyyYTvYbZRojnT4xFdhTpMqa1",
          "type": "image/jpg"
        }
      ],
      "category": "image"
    }
  }`;

  const nftMetadata = `{
    name: "Unblink at Solana Breakpoint 2024",
    description:
      "Mint the moment. Capture life's authentic moments, mint them as unique NFTs on Solana, and earn royalties through shared, unfiltered photographic experiences.",
    image:
      "https://gateway.irys.xyz/AVQbXkMRdQRXPUBio9oeyyYTvYbZRojnT4xFdhTpMqa1",
    animation_url:
      "https://gateway.irys.xyz/AJtfi91SpwQ7Ddf3xrHeoYVyWo4UAf8j46Xggqmez38B",
    external_url: "https://unblink.app/",
    attributes: [
      {
        trait_type: "booth",
        value: "Unblink",
      },
      {
        trait_type: "unblinked_by",
        value: "Th30",
      },
    ],
  }`;

  const tags = [{ name: "Content-Type", value: "application/json" }];

  try {
    // Get size of metadata file
    const size = 700 * 2;

    // Get cost to upload "size" bytes
    const price = await irys.getPrice(size);
    console.log(
      `Uploading ${size} bytes costs ${irys.utils.fromAtomic(price)} SOL`
    );
    // Fund the node
    await irys.fund(price);

    // Fund the node
    await irys.fund(price);

    const responseCollection = await irys.upload(collectionMetadata, {
      tags,
    });

    const responseNft = await irys.upload(nftMetadata, {
      tags,
    });

    console.log(
      `Collection Metadata uploaded.\nManifest URL: https://gateway.irys.xyz/${responseCollection?.id}`
    );
    console.log(
      `NFT Metadata uploaded.\nManifest URL: https://gateway.irys.xyz/${responseNft?.id}`
    );
    console.log("---------------------");
  } catch (e) {
    console.log("Error uploading file ", e);
  }

  // tsx "scripts/upload-metadata.ts"

  /**
   * Devnet
   * - Collection: https://gateway.irys.xyz/2WFXXw8dZzehTjzMQs1VRcBZzvyCa2uePS1V4pQWCgKc
   * - NFT: https://gateway.irys.xyz/4meq9njNhgZCXiN8TtfTu5E9temiSJ2DbaBhjyvYN8HC
   */

  /**
   * Mainnet
   * - Collection:
   * - NFT:
   */
};

upload();
