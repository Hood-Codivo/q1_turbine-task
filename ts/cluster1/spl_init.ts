import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "./wallet/turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));


//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        const mint = await createMint (
            connection,
            keypair,
            keypair.publicKey,
            null,
            6
        )
        console.log(`successfully created a mint ${mint}`)
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()


//  mint address : DrMdsQ85VzcrBbbb3LgVdt1kK4pCdYTsB6n6outf9Y9f


// Mint { 
//      /// Optional authority used to mint new tokens. The mint authority may only
//      /// be provided duuring mint creation. if no mint authrity is present
//      /// then the mint has a fixed supply and no further token may be 
//      /// minted.
//      pub mint_authrity: <Option<Pubkey>>,
//      /// Total supply of tokens.
//      pub supply: u64,
//     ///  Number of base 10 digits to the right of the decimal place..
//     pub decimals: u8,
//     /// Is `true` if this structure has been initialized
//     pub is_initialized: bool,
//     /// Optional authority to freeze token accounts.
//    pub freeze_authority: <Option<Pubkey>>,
// }
