// total score is 60
const riskAnalyzeObj = {
  blackList: 7,
  disabletransfer: 5,
  fakeBalance: 6,
  gasTrap: 6,
  hiddenOwnerFunctions: 6,
  highSellTax: 8,
  honeypot: 9,
  mintAccess: 6,
  tradingControl: 7,
};

const getRiskScore = (checkName) => {
  return riskAnalyzeObj[checkName] || 0;
};

module.exports = { getRiskScore };