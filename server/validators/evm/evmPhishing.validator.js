const { isAddress } = require('ethers')

const evmPhishingValidator = (data) => {
    const { userAddress, recepientAddress, currencySymbol } = data;

    if (!userAddress || !recepientAddress || !currencySymbol) {
        return { success: false, message: "Missing required fields: userAddress, recepientAddress, or currencySymbol." }
    }

    if (!isAddress(userAddress) || !isAddress(recepientAddress)) {
        return { success: false, message: "Invalid Ethereum address format." }
    }

    return { success: true }
}

module.exports = { evmPhishingValidator }