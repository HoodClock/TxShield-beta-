const { simulateSolTranscation } = require('./solanaSimulation')
const { checkTokenMetaDataIntegrity } = require('./advancedChecks')
const {} = require('@solana/web3.js')

async function sumUpAllFeatures(_connection, _contractAddress, _userAddress, _amount, _currencySymbol) {

    const result = await simulateSolTranscation(_contractAddress, _userAddress, _amount, _currencySymbol);


    // filter out the decoded logs which includes [Program that invoked]
    const logs = result.parsedLogs || [];
    const decodedInstrunction = logs.map(log => ({
        program: log.includes("Program") ? log.split("invoke")[1]?.trim() : null,
        rawLog: log
    }))


    // check the pre-balance with post-balance and measure change in them with (post - pre) 
    const preBalances = result.value.preBalances || [];

    const postBalances = result.value.postBalances || [];

    const comparedBalance = preBalances.map((pre, i) => {
        const postBal = postBalances[i] || 0;
        const change = postBal - pre;
        return {
            index: i,
            preBalances: pre,
            postBalances: postBal,
            change
        }
    })


    return { decodedInstrunction, comparedBalance }

}

module.exports = { sumUpAllFeatures }