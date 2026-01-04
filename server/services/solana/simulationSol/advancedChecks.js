const { getMint } = require("@solana/spl-token");
const { PublicKey } = require("@solana/web3.js");
const { findMetadataPda, fetchMetadata } = require("@metaplex-foundation/mpl-token-metadata");

/**
 * Performs a deep security audit of Token Metadata
 * Scans for: Mutable Metadata, Social Integrity, and Authority Risks.
 */
async function checkTokenMetaDataIntegrity(_connection, mintAddress) {
    try {

        const connection = _connection.connection || _connection;

        if (typeof connection.getAccountInfo !== 'function') {
            throw new Error("Invalid Connection object provided to Advanced Audit");
        }

        const mintPubKey = new PublicKey(mintAddress);

        // On-Chain Mint Data (The "Hard" Rules)
        let mintInfo;
        try {
            mintInfo = await getMint(connection, mintPubKey);
        } catch (e) {
            return { success: false, error: "Account is not a Token Mint (SPL/Token-2022)" };
        }

        // Metaplex Metadata (The "Identity")
        const metadataPDA = findMetadataPda(mintPubKey);
        const metadata = await fetchMetadata(connection, metadataPDA);

        // Off-Chain JSON Data (The "Social" Proof)
        let offChainData = null;
        let uriValid = false;
        try {
            const res = await fetch(metadata.uri);
            if (res.ok) {
                offChainData = await res.json();
                uriValid = true;
            }
        } catch (e) {
            uriValid = false;
        }

        // Risk Analysis
        const risks = [];

        // Check if dev can change the name/image/link at any time (Mutable)
        if (metadata.isMutable) {
            risks.push({
                level: "MEDIUM",
                issue: "Mutable Metadata",
                desc: "The developer can change the token's image or social links at any time."
            });
        }

        // Check for Mint/Freeze authorities (The "Rug" buttons)
        if (mintInfo.mintAuthority) {
            risks.push({
                level: "HIGH",
                issue: "Mint Authority Enabled",
                desc: "The developer can print infinite tokens, diluting your value."
            });
        }
        if (mintInfo.freezeAuthority) {
            risks.push({
                level: "CRITICAL",
                issue: "Freeze Authority Enabled",
                desc: "The developer can stop you from selling your tokens at any time."
            });
        }

        // Cross-Check Integrity
        // If the off-chain name doesn't match the on-chain name, it's suspicious.
        const nameMismatch = offChainData && metadata.name.trim() !== offChainData.name?.trim();
        if (nameMismatch) {
            risks.push({
                level: "HIGH",
                issue: "Metadata Mismatch",
                desc: "On-chain name does not match off-chain JSON. Potential bait-and-switch."
            });
        }

        return {
            success: true,
            name: metadata.name.replace(/\0/g, ''), // Clean null bytes
            symbol: metadata.symbol.replace(/\0/g, ''),
            uri: metadata.uri,
            isMutable: metadata.isMutable,
            mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
            freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
            decimals: mintInfo.decimals,
            socials: {
                website: offChainData?.external_url || offChainData?.extensions?.website || null,
                twitter: offChainData?.extensions?.twitter || null,
                telegram: offChainData?.extensions?.telegram || null,
            },
            uriValid,
            risks,
            isVerified: metadata.creators?.every(c => c.verified) || false
        };

    } catch (error) {
        console.error("Advanced Audit Error:", error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { checkTokenMetaDataIntegrity };