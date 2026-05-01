// Base Gas Tracker - Step 2

const { ethers } = require("ethers");
const fs = require("fs");

// Create provider for Base network
const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

// File to store logs
const LOG_FILE = "gas-log.txt";

// Function to get gas price
async function getGasPrice() {
  console.log("⛽ Fetching gas price from Base...");

  try {
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice.toString();
    const time = new Date().toLocaleString();

    const logEntry = `${time} | Gas Price: ${gasPrice}\n`;

    // Save to file
    fs.appendFileSync(LOG_FILE, logEntry);

    console.log("\n======= GAS DATA =======");
    console.log("🌐 Network     : Base");
    console.log("⛽ Gas Price   :", gasPrice);
    console.log("🕒 Time        :", time);
    console.log("💾 Saved to    :", LOG_FILE);
    console.log("========================\n");

  } catch (error) {
    console.log("❌ Error fetching gas data:", error.message);
  }
}

// Run function
getGasPrice();
