// Base Wallet Checker - Step 3

const { ethers } = require("ethers");

// Create provider for Base network
const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

// Function to get wallet balance
async function getWalletBalance() {
  console.log("Connecting to Base network...");

  const address = process.argv[2];

  if (!address) {
    console.log("❌ Please provide wallet address");
    console.log("👉 Example: node index.js 0xYourWalletAddress");
    return;
  }

  // Validate address
  if (!ethers.isAddress(address)) {
    console.log("❌ Invalid wallet address");
    return;
  }

  try {
    const balance = await provider.getBalance(address);

    console.log("=================================");
    console.log("📍 Network: Base");
    console.log("👛 Wallet:", address);
    console.log("💰 Balance:", ethers.formatEther(balance), "ETH");
    console.log("=================================");
  } catch (error) {
    console.log("❌ Error fetching balance");
  }
}

// Run function
getWalletBalance();
