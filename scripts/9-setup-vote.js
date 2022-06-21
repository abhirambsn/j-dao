import sdk from "./1-initialize-sdk.js";

const vote = sdk.getVote("0xB8925e2187cD2c8A004CAE03eB19D50F4Dd09f28");
const token = sdk.getToken("0x93dd6b4619852D2f71540A66942F4a08620bdfE7");

(async () => {
  try {
    await token.roles.grant("minter", vote.getAddress());
    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (err) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      err
    );
    process.exit(1);
  }
  try {
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;
    await token.transfer(vote.getAddress(), percent90);

    console.log(
      "✅ Successfully transferred " + percent90 + " tokens to vote contract"
    );
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();
