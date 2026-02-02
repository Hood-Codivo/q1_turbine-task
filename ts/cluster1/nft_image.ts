import wallet from "./wallet/turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";
import path from "path";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    const buffer = await readFile(
      path.join(__dirname, "assets", "privyNote.png"),
    );

    //2. Convert image to generic file.
    const file = createGenericFile(buffer, "privyNote.png", {
      contentType: "image/png",
    });

    //3. Upload image
    const [imageUri] = await umi.uploader.upload([file]);

    console.log("Your image URI: ", imageUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

// Your image URI:
// https://gateway.irys.xyz/HgWVB6oy3Ft6sihvHpV3VQjJSEfph6EZkAmzxny4RPc3
