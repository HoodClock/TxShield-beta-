const { getSourceCode } = require("../../services/etherscanService");

const approvalScam = async (_tokenAddress) => {
  const sourceData = await getSourceCode(_tokenAddress);

  if (!sourceData || !sourceData[0] || !sourceData[0].SourceCode) {
    return { success: false, reason: "No source code found" };
  }

  const sourceCode = sourceData[0].SourceCode;

  const riskyPattern = [
    "approve(msg.sender, type(uint256).max)",
    "setApprovalForAll",
    "token.approve",
    "IERC20.approve",
    "function approve(",
    "approve(address(this)",
    "spender = msg.sender",
    "require(approved == true)",
    "safeApprove",
    "unlimitedApproval = true",
  ];

  const isRisky = riskyPattern.some((item) => sourceCode.includes(item));

  if (isRisky) {
    return {
      success: true,
      risk: true,
      message: "Approval function allows unlimited or deceptive spending.",
    };
  } else {
    return {
      success: true,
      risk: false,
      message: "no risky approval logic found.",
    };
  }
};

module.exports = approvalScam;
