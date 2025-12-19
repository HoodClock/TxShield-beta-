/**
 * Normalizing all the addresses in payload.
 *
 * @param {object} payload - The payload (recepientAddress, tokenAddress, address).
 * @returns {string} Normalized addresses
 */

const { getAddress } = require('ethers')

const normalizesAddresses = (payload) => {

    const normalizedAddresses = {
        normalAddress: getAddress(payload.address),
        normalcontractAddress: getAddress(payload.contractAddress),
        normaltokenAddress: getAddress(payload.tokenAddress),
        normalrecepientAddress: getAddress(payload.recepientAddress)
    }

    return normalizedAddresses
}

module.exports = { normalizesAddresses }