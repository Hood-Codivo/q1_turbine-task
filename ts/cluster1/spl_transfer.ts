import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("DrMdsQ85VzcrBbbb3LgVdt1kK4pCdYTsB6n6outf9Y9f");

// Recipient address
const to = new PublicKey("FdUzBqV6nCKgmeLm4XLRt2Sdj38iE5Uz6RaXofqYrhd");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        )
        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        )

        // Transfer the new token to the "toTokenAccount" we just created
        const signature = await transfer(
            connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair.publicKey,
            1000000
        )

        console.log(`Transfer successful!`);
        console.log(`Transaction signature: ${signature}`);
        console.log(`From token account ${fromTokenAccount.address.toBase58()}`);
        console.log(`To token account ${toTokenAccount.address.toBase58()}`);

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();


// mint address : DrMdsQ85VzcrBbbb3LgVdt1kK4pCdYTsB6n6outf9Y9f
// receiver address : FdUzBqV6nCKgmeLm4XLRt2Sdj38iE5Uz6RaXofqYrhd
// Transfer successful!
// Transaction signature: Udp1B1wBVYmjBurdKLDHx1AiXS9L36yyvV1FVVTs4YHY8XVqKxKbaE4hM36QisEm4bdUJvCKscXLaTjxvtCcj2T
// From token account 38jezoEViVYAC9oWWG7mLMgzWkv7VyKymYYxcJoRdf2Q
// To token account GEzMBdnzmQjHPy2chiErCZZZUwZGb2y9g6SrPyAo6MeJ
