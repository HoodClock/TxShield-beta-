const { getMint } = require ("@solana/spl-token");
const { PublicKey } = require("@solana/web3.js")
const { findMetadataPda, fetchMetadata } = require("@metaplex-foundation/mpl-token-metadata")


async function checkTokenMetaDataIntegrity(connection, mintAddress) {

    try {
        // PublicKey type address
        const mintPubKey = new PublicKey(mintAddress)

        // getting on-chain mint info gives us (minting_Authority, freeze_Authority, decimals)
        const mintInfo = await getMint(connection, mintPubKey)


        // fetching PDA(Program Derived Address) for off-chain metadata account: gives (metadata address)
        const metadataPDA = findMetadataPda(mintPubKey);

        // fetching metadata account data: gives metadata.(name, symbol, uri)
        const metadata = await fetchMetadata(connection, metadataPDA);


        // Now if this URI:response:TRUE (not-scam) otherwise (Scam)

        // verifying metadata URI
        let uriValid = false;
        let offChainData = null;

        try {
            const res = await fetch(metadata.uri)
            if (res.ok) {
                uriValid = true
                offChainData = await res.json();
            }

        } catch (error) {
            uriValid = false
        }

        // Integrity Report final response
        const response = {
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
            freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
            uriValid,
            offChainData,
            valid:
                metadata.name?.length > 0 &&
                metadata.symbol?.length > 0 && uriValid,

            issues: [],
        }

        if (!uriValid) response.issues.push("Broken MetaData URI")
        if (!metadata.name) response.issues.push("Missing token name")
        if (!metadata.symbol) response.issues.push("Missing token symbol")

        return response;
        
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {checkTokenMetaDataIntegrity}