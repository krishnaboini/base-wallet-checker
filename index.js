// Base Wallet Checker - Step 1

const { ethers } = require("ethers");

// Create provider for Base network
const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

// Function to get wallet balance
async function getWalletBalance() {
  console.log("Connecting to Base network...");

  const balance = await provider.getBalance("0x0000000000000000000000000000000000000000");
  console.log("Balance:", ethers.formatEther(balance));
}

// Run function
getWalletBalance();
