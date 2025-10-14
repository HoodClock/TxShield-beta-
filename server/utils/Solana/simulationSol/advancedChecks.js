const { getMint } = require ("@solana/spl-token");
const { PublicKey } = require("@solana/web3.js")
const { findMetadataPda, fetchMetadata } = require("@metaplex-foundation/mpl-token-metadata")


async function checkTokenMetaDataIntegrity(connection, mintAddress) {

    try {
        const mintPubKey = new PublicKey(mintAddress)

        // getting mint info
        const mintInfo = await getMint(connection, mintPubKey)


        // fetching PDA(Program Derived Address) for metadata account
        const metadataPDA = findMetadataPda(mintPubKey);

        // fetching metadata account data
        
        const metadata = await fetchMetadata(connection, metadataPDA);

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
            freezeAithority: mintInfo.freezeAuthority?.toBase58() || null,
            uriValid,
            valid:
                metadata.name?.length > 0 &&
                metadata.symbol?.length > 0 && uriValid,

            issues: [],
        }

        if (!uriValid) response.issues.push("Invalid metadata URI")
        if (!metadata.name) response.issues.push("Missing token name")
        if (!metadata.symbol) response.issues.push("Missing token symbol")

        return response;
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {checkTokenMetaDataIntegrity}