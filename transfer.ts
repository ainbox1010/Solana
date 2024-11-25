import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

async function main() {
    try {
        const suppliedToPubkey = process.argv[2] || null;

        if (!suppliedToPubkey) {
            console.log(`Please provide a public key to send to`);
            process.exit(1);
        }

        const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
        console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

        const toPubkey = new PublicKey(suppliedToPubkey);
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        console.log(
            `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
        );

        const transaction = new Transaction();
        const LAMPORTS_TO_SEND = 2000000;

        const sendSolInstruction = SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey,
            lamports: LAMPORTS_TO_SEND,
        });

        transaction.add(sendSolInstruction);

        console.log("Sending transaction...");
        const signature = await sendAndConfirmTransaction(connection, transaction, [
            senderKeypair,
        ]);

        console.log(
            `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
        );
        console.log(`Transaction signature is ${signature}!`);
        
        // Keep process alive to see the output
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
        console.error("Error:", error);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

main();

