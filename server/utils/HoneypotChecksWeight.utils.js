// total score is 65
const riskAnalyzeObj = {
    blackList: 10,
    disabletransfer: 8,
    fakeBalance: 4,
    gasTrap: 3,
    hiddenOwnerFunctions: 7,
    highSellTax: 5,
    honeypot: 10,
    mintAccess: 10,
    tradingControl: 8,
};

const getRiskScore = (checkName) => {
    return riskAnalyzeObj[checkName] || 0;
};

module.exports = { getRiskScore, riskAnalyzeObj };