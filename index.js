// Base Gas Tracker - Step 4

const { ethers } = require("ethers");
const fs = require("fs");

// Create provider for Base network
const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

// File to store logs
const LOG_FILE = "gas-log.txt";

// Handle CLI help
if (process.argv.includes("--help")) {
  console.log(`
Usage:
  node index.js           → Fetch current gas + log
  node index.js --help    → Show help

Description:
  Tracks Base gas price and stores logs locally.
`);
  process.exit();
}

// Function to get gas price
async function getGasPrice() {
  console.log("⛽ Fetching gas price from Base...");

  try {
    const feeData = await provider.getFeeData();
    const gasPrice = Number(feeData.gasPrice);
    const time = new Date().toLocaleString();

    const logEntry = `${time} | ${gasPrice}\n`;

    fs.appendFileSync(LOG_FILE, logEntry);

    console.log("\n======= GAS DATA =======");
    console.log("🌐 Network     : Base");
    console.log("⛽ Gas Price   :", gasPrice);
    console.log("🕒 Time        :", time);
    console.log("💾 Saved to    :", LOG_FILE);
    console.log("========================\n");

    showStats();

  } catch (error) {
    console.log("❌ Error fetching gas data:", error.message);
  }
}

// Function to show stats
function showStats() {
  if (!fs.existsSync(LOG_FILE)) return;

  const data = fs.readFileSync(LOG_FILE, "utf-8").trim().split("\n");

  const last5 = data.slice(-5);
  const values = last5.map(line => Number(line.split("|")[1]));

  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  console.log("📊 Last 5 Gas Entries:");
  last5.forEach(line => console.log("   ", line));

  console.log("📈 Average Gas (last 5):", avg.toFixed(2));
}

// Run function
getGasPrice();
