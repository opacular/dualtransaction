// Import Lucid + Koios (Replace with Blockfrost if needed)
import { Lucid, Blockfrost } from "@lucid-evolution/lucid";

// Import dotenv to read secret variables from .env file
import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV ? ".env." + process.env.NODE_ENV : ".env.example",
});

console.log("Network:", process.env.API_NETWORK); // use npm run preprod/mainnet to switch networks
if(!process.env.API_NETWORK) {
  console.log("API_NETWORK not set");
  process.exit(1);
}

if (!process.env.API_URL) {
  console.log("API_URL not set");
  process.exit(1);
}

if (!process.env.BLOCKFROST_TOKEN) {
  console.log("BLOCKFROST_TOKEN not set");
  process.exit(1);
}

if (!process.env.SEEDPHRASE) {
  console.log("SEEDPHRASE not set");
  process.exit(1);
}


// Create a new instance of Lucid via Blockfrost
const lucid = await Lucid(
  new Blockfrost(process.env.API_URL, process.env.BLOCKFROST_TOKEN),
  process.env.API_NETWORK
);

// Set the wallet from a seed phrase
const seedPhrase = process.env.SEEDPHRASE;
lucid.selectWallet.fromSeed(seedPhrase);

// Get the wallet address
const address = await lucid.wallet().address();
console.log("Wallet address:", address);

// Get the reward address
const rewardAddress = await lucid.wallet().rewardAddress();
console.log("Reward address:", rewardAddress);

// DRep ID
const drep = { __typename: "AlwaysAbstain" };

// Set the receiver address
const receiverAddress = process.env.RECEIVER_ADDRESS;

// Build the transactions
const tx = await lucid
  .newTx()
  .pay.ToAddress(receiverAddress, { lovelace: 5000000n }) // Sends 5 ADA to address
  // .registerAndDelegate.ToDrep(rewardAddress, drep) // registers stake credentials and delegates to DRep in one go, only needed for new wallets - or:
  .delegate.VoteToDRep(rewardAddress, drep) // Delegates to DRep
  .complete();

// Sign the transaction
const signedTx = await tx.sign.withWallet().complete();

// Submit the transaction with error handling
let txHash = false;
try {
  // Submit the transactions
  txHash = await signedTx.submit();
} catch (e) {
  // Error handling
  console.log("Error submitting tx:", e);
}

// Log the transaction hash if successful
if (txHash) console.log("Tx submitted:", txHash);
else console.log("Something went wrong :(");
