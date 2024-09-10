import { getIrys } from "@/lib/getIrys";
import dotenv from "dotenv";
import * as fs from "fs";
import path from "path";
dotenv.config();

const upload = async () => {
  const irys = await getIrys();

  // Supports multiple files, uploaded invididually
  const filesToUpload = [
    {
      path: "../public/assets/logo/logo-only.png",
      tags: [{ name: "Content-Type", value: "image/png" }],
    },
    {
      path: "../public/assets/logo/animated.gif",
      tags: [{ name: "Content-Type", value: "image/gif" }],
    },
  ];

  filesToUpload.forEach(async (fileToUpload) => {
    const file = path.resolve(__dirname, fileToUpload.path);
    const tags = fileToUpload.tags;

    try {
      // Get size of file
      const { size } = await fs.promises.stat(file);

      // Get cost to upload "size" bytes
      const price = await irys.getPrice(size);
      console.log(
        `Uploading ${size} bytes costs ${irys.utils.fromAtomic(price)} SOL`
      );

      // Fund the node
      await irys.fund(price);

      const response = await irys.uploadFile(file, {
        tags,
      });

      console.log(
        `${fileToUpload.path} uploaded.\nManifest URL: https://gateway.irys.xyz/${response?.id}`
      );
      console.log("---------------------");
    } catch (e) {
      console.log("Error uploading file ", e);
    }
  });

  // tsx "scripts/upload-images.ts"

  /**
   * Devnet
   * - GIF: https://gateway.irys.xyz/AJtfi91SpwQ7Ddf3xrHeoYVyWo4UAf8j46Xggqmez38B
   * - PNG: https://gateway.irys.xyz/AVQbXkMRdQRXPUBio9oeyyYTvYbZRojnT4xFdhTpMqa1
   */

  /**
   * Mainnet
   * - GIF:
   * - PNG:
   */
};

upload();
