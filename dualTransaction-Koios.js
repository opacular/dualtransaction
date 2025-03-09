// import Lucid + Koios (Replace with Blockfrost if needed)
import { Lucid, Koios } from "@lucid-evolution/lucid";

// import dotenv to read secret variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Create a new instance of Lucid
// CHANGE TO BLOCKFROST IF NEEDED
const lucid = await Lucid(
  new Koios("https://preprod.koios.rest/api/v1"),
  "Preprod"
);

// Set the wallet from a seed phrase
const seedPhrase = process.env.SEEDPHRASE;
lucid.selectWallet.fromSeed(seedPhrase);

// get the wallet address
const address = await lucid.wallet().address();
console.log("Wallet address:", address);

// get the reward address
const rewardAddress = await lucid.wallet().rewardAddress();
console.log("Reward address:", rewardAddress);

// DRep ID
const drep = { __typename: "AlwaysAbstain" };

// set the receiver address
const receiverAddress = process.env.RECEIVER_ADDRESS;

// get the wallet info from Koios
// CHANGE TO BLOCKFROST IF NEEDED
const walletInfo = await fetch(
  "https://preprod.koios.rest/api/v1/account_info",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _stake_addresses: [rewardAddress] }),
  }
).then((res) => res.json());
console.log("Wallet info:", walletInfo[0]);

// build the transaction
const tx = await lucid
  .newTx()
  .pay.ToAddress(receiverAddress, { lovelace: 5000000n }) // sends 5 ADA to address
  // .registerAndDelegate.ToDrep(rewardAddress, drep) // registers stake credentials and delegates to DRep in one go, only needed for new wallets - or:
  .delegate.VoteToDRep(rewardAddress, drep) // delegates to DRep
  .complete();

// sign the transaction
const signedTx = await tx.sign.withWallet().complete();

// submit the transaction with error handling
let txHash = false;
try {
  // submit the transaction
  txHash = await signedTx.submit();
} catch (e) {
  // error handling
  console.log("Error submitting tx:", e);
}

// log the transaction hash if successful
if (txHash) console.log("Tx submitted:", txHash);
else console.log("Something went wrong :(");
