import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote("0xB8925e2187cD2c8A004CAE03eB19D50F4Dd09f28");
const token = sdk.getToken("0x93dd6b4619852D2f71540A66942F4a08620bdfE7");

(async () => {
  try {
    const amount = 420_000;
    const description =
      "Should DAO mint an additional " + amount + " tokens into the treasury?";
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ];
    await vote.propose(description, executions);
    console.log("✅ Successfully created proposal to mint tokens");
  } catch (err) {
    console.error("failed to create first proposal", err);
    process.exit(1);
  }
  try {
    // Create proposal to transfer ourselves 6,900 tokens for being awesome.
    const amount = 6_900;
    const description =
      "Should the DAO transfer " +
      amount +
      " tokens from the treasury to " +
      process.env.WALLET_ADDRESS +
      " for being awesome?";
    const executions = [
      {
        // Again, we're sending ourselves 0 ETH. Just sending our own token.
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          // We're doing a transfer from the treasury to our wallet.
          "transfer",
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: token.getAddress(),
      },
    ];

    await vote.propose(description, executions);

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();
