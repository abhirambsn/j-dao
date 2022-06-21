import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x93dd6b4619852D2f71540A66942F4a08620bdfE7");

(async () => {
    try {
      
      const amount = 1000000;
      await token.mintToSelf(amount);
      const totalSupply = await token.totalSupply();

      console.log("✅ There now is", totalSupply.displayValue, "JDYEN in circulation");
    } catch (error) {
      console.error("Failed to print money", error);
    }
  })();