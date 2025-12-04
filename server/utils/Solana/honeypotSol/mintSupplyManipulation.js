// it detects if the token_supply can still be increased or force_reduced (pump/dump) which enables (infinite minting or supply attacks)

const { getMint } = require("@solana/spl-token")

const mintSupplyManipulation = async (_connection, _mintPubkey) => {

    const tokenMetaData = await getMint(_connection, _mintPubkey)

    const firstManipulation = tokenMetaData.mintAuthority
        ? "Due to mint authority: Token supply can still be increased."
        : "No Freeze Authority So Token can't be increased."

    const secondManipulation = tokenMetaData.freezeAuthority
        ? "Attackers can freeze your token anytime due to enabled freeze authority"
        : "Attackers can't freeze your token because freeze authority not enabled"

    let trustScore = 0
    let riskLevel = "Low"

    if (tokenMetaData.mintAuthority || tokenMetaData.freezeAuthority) {
        // risky
        trustScore--
        riskLevel = "High"
    } else {
        // safe 
        trustScore++
        riskLevel = "Low"
    }

    // current token supply
    const totalSupply = tokenMetaData.supply

    // getting token decimals
    const tokenDecimals = tokenMetaData.decimals

    // converting to human readable form with decimals
    const humanSupply = totalSupply / 10 ** tokenDecimals

    // making threshold around (1 lack token) 
    const threshold = 100000

    if (humanSupply < threshold) {
        riskLevel = "Midium"
    }

    // getting timestamps along with SLOT
    const parsedInfo = await _connection.getParsedAccountInfo(_mintPubkey)
    const createdSlot = parsedInfo.value?.slot || null

    let createdTime = null

    if (createdSlot) {
        createdTime = await _connection.getBlockTime(createdSlot)
    }

    // if token is very new (< 7) increase risk 
    const currentUnix = Math.floor(Date.now() / 1000);
    const sevenDays = 60 * 60 * 24 * 7

    if (createdTime && currentUnix - createdTime < sevenDays) {
        riskLevel = "High"
        trustScore--
    }


    const responseOfSupplyManipulation = {
        mintAuthorityStatus: firstManipulation,
        freezeAuthorityStatus: secondManipulation,
        supply: {
            raw: totalSupply,
            decimals: tokenDecimals,
            humanReadable: humanSupply
        },
        createdInfo: {
            createdSlot: createdSlot,
            createdTime: createdTime
        },
        trustScore: trustScore,
        riskLevel: riskLevel
    }

    return responseOfSupplyManipulation
}


export default { mintSupplyManipulation };