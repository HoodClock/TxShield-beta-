const { ethers } = require("ethers");

/**
 * @description The "Assassin" Mint Brute-Forcer (Zero Forge Overhead)
 * @param {string} _targetContract
 * @param {string} _rpcUrl
 */
const _mintAccess = async (_targetContract, _rpcUrl) => {
  try {
    const provider = new ethers.JsonRpcProvider(_rpcUrl);
    
    // 1. EXTRACT BYTECODE & SELECTORS
    const bytecode = await provider.getCode(_targetContract);
    if (bytecode === "0x") {
       return { isMintable: false, riskScore: 0, reason: "Contract not deployed or empty." };
    }

    const push4Regex = /63([a-fA-F0-9]{8})/g;
    const matches = [...bytecode.matchAll(push4Regex)];
    const uniqueSelectors = [...new Set(matches.map(m => m[1]))];
    
    if (uniqueSelectors.length === 0) {
        return { isMintable: false, riskScore: 0, reason: "No callable functions found." };
    }

    console.log(`[TxShield] Assassin extracted ${uniqueSelectors.length} functions. Engaging...`);

    // 2. GET OWNER AND SUPPLY
    const contract = new ethers.Contract(
      _targetContract, 
      ["function owner() view returns (address)", "function totalSupply() view returns (uint256)"], 
      provider
    );

    let targetOwner;
    try {
      targetOwner = await contract.owner();
    } catch {
      targetOwner = "0x000000000000000000000000000000000000dEaD"; // Dummy fallback
    }

    let initialSupply;
    try {
      initialSupply = await contract.totalSupply();
    } catch {
      return { isMintable: false, riskScore: 0, reason: "No totalSupply function. Cannot verify mint." };
    }

    // 3. IMPERSONATE THE OWNER (Anvil Native Cheatcode)
    await provider.send("anvil_impersonateAccount", [targetOwner]);
    
    // Fund the owner just in case the contract checks for gas/balance
    await provider.send("anvil_setBalance", [targetOwner, "0x1000000000000000000000"]);
    
    // Get a signer that acts as the impersonated owner
    const impersonatedSigner = await provider.getSigner(targetOwner);

    // 4. THE RUTHLESS BRUTE-FORCE LOOP
    // We pad the payload amounts just like standard ABI encoding
    const amountHex = ethers.zeroPadValue(ethers.toBeHex(ethers.parseEther("1000000")), 32);
    const deadAddressHex = ethers.zeroPadValue("0x000000000000000000000000000000000000dEaD", 32);

    for (let hex of uniqueSelectors) {
      const selector = "0x" + hex;

      // Payload A: selector + (uint256 amount)
      const payloadA = ethers.concat([selector, amountHex]);
      
      // Payload B: selector + (address to, uint256 amount)
      const payloadB = ethers.concat([selector, deadAddressHex, amountHex]);

      const payloads = [payloadA, payloadB];

      for (let payload of payloads) {
        try {
          // Send the fake transaction directly to the mempool
          await impersonatedSigner.sendTransaction({
            to: _targetContract,
            data: payload,
            gasLimit: 500000 // High gas limit to prevent out-of-gas reverts
          });

          // Check if supply increased
          const newSupply = await contract.totalSupply();
          if (newSupply > initialSupply) {
            
            // CLEANUP: Stop impersonating before returning
            await provider.send("anvil_stopImpersonatingAccount", [targetOwner]);
            
            return {
              isMintable: true,
              riskScore: 80,
              reason: `Critical: Hidden mint detected via dynamic opcode execution (Selector: ${selector}).`
            };
          }
        } catch (e) {
          // Transaction reverted (expected for 99% of functions). We silently ignore and continue.
        }
      }
    }

    // CLEANUP
    await provider.send("anvil_stopImpersonatingAccount", [targetOwner]);
    
    return { isMintable: false, riskScore: 0, reason: "No minting vulnerabilities found in bytecode." };

  } catch (err) {
    console.error("[TxShield] Assassin Mint Error:", err);
    return {
      isMintable: true,
      riskScore: 100,
      reason: "Catastrophic simulation failure. Contract is highly suspicious or uses revert traps.",
    };
  }
};

module.exports = { _mintAccess };
