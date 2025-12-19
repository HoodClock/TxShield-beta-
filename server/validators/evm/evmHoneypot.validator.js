// checking if the payload is valid

const evmHoneypotValidator = (body) => {
    const { normalAddress, normalcontractAddress, normaltokenAddress, normalrecepientAddress, value, currencySymbol } = body

    try {
        if (!normalAddress || !normalcontractAddress || !normaltokenAddress || !normalrecepientAddress || !value || currencySymbol) {
            return {
                success: false,
                message: "Some credentials are missing"
            }
        }

        return true

    } catch (err) {
        return { success: false, error: err.message };
    }
}

module.exports = { evmHoneypotValidator }