// it detects if the token_supply can still be increased or force_reduced (pump/dump) which enables (infinite minting or supply attacks)

const { getMint } = require("@solana/spl-token")


const mintSupplyManipulation = async (_connection, _mintPubkey) => {

    const tokenMetaData = await getMint(_connection, _mintPubkey)
    let riskScore = 0 // Max Risk is 10
    let riskFlags = []

    // Check Mint Authority (Weight: 4 - Highest Risk)
    const hasMintAuthority = !!tokenMetaData.mintAuthority;
    const mintStatus = hasMintAuthority
        ? "**HIGH RISK**: Mint authority enabled. Token supply can be infinitely increased (inflationary attack)."
        : "Low Risk: Mint authority revoked. Token supply is fixed."

    if (hasMintAuthority) {
        riskScore += 4;
        riskFlags.push("Mint Authority Present");
    }

    // Check Freeze Authority (Weight: 3 - Major Risk)
    const hasFreezeAuthority = !!tokenMetaData.freezeAuthority;
    const freezeStatus = hasFreezeAuthority
        ? "**MAJOR RISK**: Freeze authority enabled. Attackers can freeze/lock your tokens anytime."
        : "Low Risk: Freeze authority revoked. Tokens cannot be frozen."

    if (hasFreezeAuthority) {
        riskScore += 3;
        riskFlags.push("Freeze Authority Present");
    }

    // Current Token Supply (Weight: 1 - Contextual Risk)
    const totalSupply = tokenMetaData.supply
    const tokenDecimals = tokenMetaData.decimals
    const humanSupply = totalSupply / 10 ** tokenDecimals
    const threshold = 100000 
    let supplyRisk = "Neutral";

    if (humanSupply < threshold) {
        // While not a direct honeypot, low supply can mean higher volatility/manipulation risk
        riskScore += 1;
        supplyRisk = "Minor Risk: Very low initial supply (< 100k) suggests high volatility/potential for rapid pump.";
        riskFlags.push("Low Initial Supply");
    }

    // Token Age Check (Weight: 2 - Time Risk)
    const parsedInfo = await _connection.getParsedAccountInfo(_mintPubkey)
    const createdSlot = parsedInfo.value?.slot || null
    let createdTime = null

    if (createdSlot) {
        createdTime = await _connection.getBlockTime(createdSlot)
    }

    const currentUnix = Math.floor(Date.now() / 1000);
    const sevenDays = 60 * 60 * 24 * 7
    let ageRisk = "Neutral";

    if (createdTime && (currentUnix - createdTime) < sevenDays) {
        // Tokens under 7 days old are considered extremely high risk for rugs/honeypots
        riskScore += 2;
        ageRisk = "**MAJOR RISK**: Token is brand new (less than 7 days old). High-risk period for pump-and-dump scams.";
        riskFlags.push("Under 7 Days Old");
    }

    // Final Risk Level Determination
    let finalRiskLevel = "LOWEST";
    if (riskScore >= 7) {
        finalRiskLevel = "CRITICAL";
    } else if (riskScore >= 4) {
        finalRiskLevel = "HIGH";
    } else if (riskScore > 0) {
        finalRiskLevel = "MODERATE";
    }

    // RESPONSE STRUCTURE
    const responseOfSupplyManipulation = {
        assessmentRating: finalRiskLevel,
        totalRiskScore: `${riskScore} / 10`,

        // Detailed authority responses
        authorityStatus: {
            mintAuthority: mintStatus,
            freezeAuthority: freezeStatus
        },

        // Contextual Risk Factors
        supplyRiskStatus: supplyRisk,
        ageRiskStatus: ageRisk,

        // Raw Data & Flags
        rawSupply: {
            raw: totalSupply.toString(),
            decimals: tokenDecimals,
            humanReadable: humanSupply
        },
        createdInfo: {
            createdSlot: createdSlot,
            createdTime: createdTime ? new Date(createdTime * 1000).toISOString() : "Unknown"
        },
        riskFlags: riskFlags
    }

    return responseOfSupplyManipulation
}


export default { mintSupplyManipulation };