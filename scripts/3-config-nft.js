import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(
  "0xdD30A652994cD78A09dD8AC6Aa8fF69C55DA1cF9"
);
(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Gojo Satoru GIF",
                description: 'This NFT gives access to JapanDAO',
                image: readFileSync('scripts/assets/nft.gif'),
            }
        ])
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (err) {
        console.error("failed to create the new NFT", err);
    }
})();
