import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0xdD30A652994cD78A09dD8AC6Aa8fF69C55DA1cF9");

(async () => {
    try {
        const claimConditions = [{
            startTime: new Date(),
            maxQuantity: 50_000,
            price: 0,
            quantityLimitPerTransaction: 1,
            waitInSeconds: MaxUint256
        }]

        await editionDrop.claimConditions.set(0, claimConditions);
        console.log("✅ Successfully set claim condition!");
    } catch (err) {
        console.error("Failed to set claim condition", err);
    }
})();