const { exec } = require("child_process");
const util = require("util");
const path = require("path");
const execAsync = util.promisify(exec);

/**
 * @description Tag ANY function that can mint tokens in target-contract
 * @param {string} _targetContract
 * @param {string} _rpcUrl
 * @returns {Promise<{isMintable: boolean, riskScore: number, reason: string}>}
 */

const _mintAccess = async (_targetContract, _rpcUrl) => {
  try {
    const protocolsDir = path.resolve(__dirname, "../../../../protocols");

    const { stdout, stderr } = await execAsync(
      `export TARGET_CONTRACT=${_targetContract} && forge test --match-test test_BruteForceMint --fork-url ${_rpcUrl} -vv`,
      {
        cwd: protocolsDir,
      },
    );

    const output = stdout + stderr;

    if (output.includes("MINT_DETECTED")) {
      return {
        isMintable: true,
        riskScore: 80,
        reason: "Hidden minting function found via state-change analysis.",
      };
    }

    return { isMintable: false, riskScore: 0, reason: "No minting detected." };
  } catch (err) {
    const output = (err.stdout || "") + (err.stderr || "");

    if (output.includes("MINT_DETECTED")) {
      return {
        isMintable: true,
        riskScore: 80,
        reason: "Hidden minting function found via state-change analysis.",
      };
    }

    // if it reverts, then it might be honeypot itself
    return {
      isMintable: true,
      riskScore: 100,
      reason:
        "Simulation failed: Contract might be using a revert-trap or custom logic.",
    };
  }
};

module.exports = { _mintAccess };
