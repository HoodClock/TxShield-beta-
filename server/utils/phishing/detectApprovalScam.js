const resolveImplementation = require("../resolveImplementation");

const approvalScam = async (_tokenAddress) => {
  const { sourceCode} = await resolveImplementation(_tokenAddress);

  if (!sourceCode) {
    return { success: false, reason: "No source code found" };
  }

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

  return {
    success: true,
    risk: isRisky,
    reason: isRisky
      ? "Approval function allows unlimited or deceptive spending."
      : "No risky approval logic found.",
  };
};

module.exports = approvalScam;
