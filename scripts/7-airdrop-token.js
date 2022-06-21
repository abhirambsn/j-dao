import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0xdD30A652994cD78A09dD8AC6Aa8fF69C55DA1cF9");
const token = sdk.getToken("0x93dd6b4619852D2f71540A66942F4a08620bdfE7");

(async () => {
  try {
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }
    const airdropTargets = walletAddresses.map((address) => {
      const randomAmt = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmt, "tokens to", address);
      const airdropTarget = {
        toAddress: address,
        amount: randomAmt,
      };

      return airdropTarget;
    });
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
