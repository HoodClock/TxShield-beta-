// checking if the payload is valid

const evmHoneypotValidator = (payload) => {
    const { normalAddress, normalcontractAddress, normaltokenAddress, normalrecepientAddress, value, currencySymbol } = payload

    try {
        if (!normalAddress || !normalcontractAddress || !normaltokenAddress || !normalrecepientAddress || !value || !currencySymbol) {
            return {
                success: false,
                message: "Some credentials are missing"
            }
        }

        return { success: true }

    } catch (err) {
        return { success: false, error: err.message };
    }
}

module.exports = { evmHoneypotValidator }