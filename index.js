// Base Wallet Checker - Step 1

const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
console.log("Connecting to Base network...");
async function checkBalance() {
  const balance = await provider.getBalance("0x0000000000000000000000000000000000000000");
  console.log("Balance:", ethers.formatEther(balance));
}

checkBalance();
