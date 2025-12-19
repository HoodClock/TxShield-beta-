const crypto = require("crypto")

/**
 * Generates a unique, deterministic cache key from the simulation payload.
 *
 * @param {object} payload - The transaction payload (userAddress, recepientAddress, amount, currencySymbol).
 * @returns {string} The unique cache key.
 */

const generateChacheKey = (payload) => {
    // sort the object keys so to produce the same hash everytime
    const sortedKey = Object.keys(payload).sort()

    // stable string representation of payload
    const stablePayloadString = sortedKey.map(key => `${key}: ${payload[key]}`).join('|');

    // using sha-256 to hash stablePayloadString
    const hash = crypto.createHash('sha256').update(stablePayloadString).digest('hex')

    // return {prefix + hash}
    return `sim_tx${hash}`;
}


/**
 * Generates a simple, readable cache key for contract-sepecific data
 * @param {string} chain -> (eth or sol)
 * @param {string} contract -> the sepecific unique contract
 * @param {string} type -> certain function type what its user for e.g[getAbi, getByteCode, getSourceCode, isContract]
 * @returns {string} -> formatted redis key
 */

const generateContractKey = (chain, address, type) => {
    // normalizing the address to lowercase (so checksum not create duplicate key) 
    const cleanAddress = address.toLowerCase()
    const cleanChain = chain.toUpperCase()

    return `contract:${cleanChain}:${cleanAddress}:${type}`;
}

module.exports = {
    generateChacheKey,
    generateContractKey
}
