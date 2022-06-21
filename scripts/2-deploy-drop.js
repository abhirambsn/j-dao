import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            name: "JapanDAO Membership",
            description: "A DAO for Japanese Enthusiasts",
            image: readFileSync('scripts/assets/membership-nft.png'),
            primary_sale_recipient: AddressZero
        });
        const editionDrop = sdk.getEditionDrop(editionDropAddress);
        const metadata = await editionDrop.metadata.get();
        console.log(
            "✅ Successfully deployed editionDrop contract, address:",
            editionDropAddress,
          );
          console.log("✅ editionDrop metadata:", metadata);
    } catch (err) {
        console.log("failed to deploy editionDrop contract", err);
    }
})();