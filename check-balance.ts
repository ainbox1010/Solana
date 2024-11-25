import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

console.log("================================================");

async function checkBalance() {
  const publicKey = new PublicKey("5Nkogk7RzvSoNbpRHTn14yYaAgEvkvh25YZZEuYMEpHT");
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    
  console.log(`🔍 Checking balance for wallet address ${publicKey}...`);
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    
  console.log(
      `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
  );
  await new Promise(resolve => setTimeout(resolve, 1000));
}

checkBalance().catch(err => console.error(err));