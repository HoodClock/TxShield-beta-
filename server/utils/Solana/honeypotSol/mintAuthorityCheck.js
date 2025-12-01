const { getMint } = require("@solana/spl-token")
const { PublicKey } = require("@solana/web3.js")

const mintAuthorityCheck = async (_connection, _contractAddress) => {

    try {
        const mintPubKey = new PublicKey(_contractAddress);

        // getting onchain metadata
        const mintInfo = await getMint(_connection, mintPubKey);

        // extracting authorities from mintInfo and convert to base58
        const authorities = {
            mintAuthority: mintInfo?.mintAuthority ? mintInfo.mintAuthority.toBase58() : null,
            freezeAuthority: mintInfo?.freezeAuthority ? mintInfo?.freezeAuthority.toBase58() : null
        }

        const riskLevel = authorities.mintAuthority
            ? "HIGH — minting can still happen"
            : authorities.freezeAuthority
                ? "MEDIUM — token supply can't move freely"
                : "LOW — safe, both authorities revoked"


        return {
            ...authorities,
            riskLevel
        }
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = { mintAuthorityCheck };