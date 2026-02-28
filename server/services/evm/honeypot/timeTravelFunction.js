const { ethers } = require("ethers");

const ROUTER_ABI = [
  "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable",
  "function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external",
  "function WETH() external pure returns (address)"
];

const ERC20_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

/**
 * @description Native Time-Travel Check (Zero Forge Overhead)
 * @param {string} _targetContract
 * @param {string} _routerAddress
 * @param {string} _rpcUrl
 */
const _timeTravelCheck = async (_targetContract, _routerAddress, _rpcUrl) => {
  const TESTER_ADDR = "0x0000000000000000000000000000000000009999";
  
  try {
    const provider = new ethers.JsonRpcProvider(_rpcUrl);
    
    // 1. SETUP TESTER
    await provider.send("anvil_impersonateAccount", [TESTER_ADDR]);
    await provider.send("anvil_setBalance", [TESTER_ADDR, "0x56BC75E2D63100000"]); // 100 ETH
    
    const signer = await provider.getSigner(TESTER_ADDR);
    const router = new ethers.Contract(_routerAddress, ROUTER_ABI, signer);
    const token = new ethers.Contract(_targetContract, ERC20_ABI, signer);

    let weth;
    try {
      weth = await router.WETH();
    } catch {
      weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // Mainnet Fallback
    }

    // 2. INITIAL BUY
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    try {
      const buyTx = await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
        0, [weth, _targetContract], TESTER_ADDR, deadline, 
        { value: ethers.parseEther("1"), gasLimit: 1000000 }
      );
      await buyTx.wait();
    } catch (e) {
      await provider.send("anvil_stopImpersonatingAccount", [TESTER_ADDR]);
      return { isTimeHoneypot: true, riskScore: 50, reason: "Initial buy simulation failed." };
    }

    const balance = await token.balanceOf(TESTER_ADDR);
    if (balance === 0n) {
      await provider.send("anvil_stopImpersonatingAccount", [TESTER_ADDR]);
      return { isTimeHoneypot: true, riskScore: 100, reason: "Token transfer failed on buy." };
    }

    const approveTx = await token.approve(_routerAddress, ethers.MaxUint256);
    await approveTx.wait();

    // 3. TIME WARP SELLS
    const intervals = [
      { time: 0, label: "Immediate" },
      { time: 86400, label: "24 hours" },
      { time: 604800, label: "7 days" },
      { time: 2592000, label: "30 days" }
    ];

    let riskScore = 0;
    let reasons = [];
    let isTimeHoneypot = false;

    for (const interval of intervals) {
      const snapId = await provider.send("anvil_snapshot", []);
      
      if (interval.time > 0) {
        await provider.send("evm_increaseTime", [interval.time]);
        await provider.send("evm_mine", []);
      }

      const ethBefore = await provider.getBalance(TESTER_ADDR);
      
      try {
        const sellTx = await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
          balance, 0, [_targetContract, weth], TESTER_ADDR, deadline + interval.time,
          { gasLimit: 1000000 }
        );
        await sellTx.wait();

        const ethAfter = await provider.getBalance(TESTER_ADDR);
        if (ethAfter <= ethBefore) {
          isTimeHoneypot = true;
          riskScore += (interval.time === 0 ? 30 : 20);
          reasons.push(`100% tax after ${interval.label}`);
        }
      } catch (e) {
        isTimeHoneypot = true;
        riskScore += (interval.time === 0 ? 40 : 20);
        reasons.push(`Sell failed after ${interval.label}`);
      }

      await provider.send("anvil_revert", [snapId]);
    }

    await provider.send("anvil_stopImpersonatingAccount", [TESTER_ADDR]);

    if (isTimeHoneypot) {
      return { 
        isTimeHoneypot, 
        riskScore: Math.min(riskScore, 100), 
        reason: reasons.join(". ") 
      };
    }

    return { isTimeHoneypot: false, riskScore: 0, reason: "No time-based restrictions detected." };

  } catch (err) {
    console.error("[TxShield] TimeTravel Error:", err);
    return { isTimeHoneypot: true, riskScore: 30, reason: "Time-travel simulation failed to execute." };
  }
};

module.exports = { _timeTravelCheck };
