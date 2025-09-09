const {ethers} = require('ethers')
const {getAbi, getByteCode} = require('../../services/etherscanService')
const provider = require('../../config/provider')

/* THIS FUNCTION [permit-selector] CONTAINS:
address owner
address spender
value(amount)
deadline
uint8
byte32 
byte 32
*/

const PERMIT_SELETECTOR = '0xd505accf';
const UINT256_MAX = ethers.MaxUint256;

/* 
Detects if a token contracts implements EIP-2612 permit():- allow unlimited token withdrawals without normal approval steps. 
*/

async function detectPermitPhishing (contractAddress, currencySymbols) {

        if(!ethers.isAddress(contractAddress)){
            throw new Error("Invalid contract address")
        }
    
        // check in abi first for function named [permit]
        const abi = await getAbi(contractAddress, currencySymbols);
        let hasPermit = false;
    
        if (Array.isArray(abi)){
                hasPermit = abi.some((item)=> 
                item.type === 'function' &&
                item.name.toLowerCase() === 'permit' &&
                item.input.length === 7
            );
        }
    
    
        // if abi wont have check in bytecode
        if (!hasPermit){
            const byteCode = await getByteCode(contractAddress, currencySymbols)
            if (byteCode && byteCode.includes(PERMIT_SELETECTOR.slice(2))){
                hasPermit = true
            }
        }
    
        // if not found return a response
        if (!hasPermit){
            return{
                hasPermit: false,
                unlimitedApprovalRisk: false,
                reason: 'No PERMIT function detected'
            }
        }
    
        
        /* doing static call of transaction so we know is there any unlimited approval (withdrawl) */
        const unlimitedApprovalRisk = false;
        
        try {
            const contract = await ethers.Contract(contractAddress, abi, provider)
        
            // making a dummy data of PERMIT SELECTOR 
            const dummyOwner = ethers.Wallet.createRandom().address;
            const dummySpender = ethers.Wallet.createRandom().address;
            const deadline = Math.floor (Date.now() / 1000) + 3600 // 1 hour
            const v = 27
            const r = ethers.ZeroHash
            const s = ethers.ZeroHash
        
            const encodedData = contract.interface.encodeFunctionData('permit', [
                dummyOwner,
                dummySpender,
                UINT256_MAX,
                deadline,
                v,
                r,
                s
            ]);
        
            if (encodedData.includes(UINT256_MAX.toString(16).slice(2))){
                unlimitedApprovalRisk = true
            }
        } catch (error) {
            // abi might not mathch exactly (the permit), fallback will 
            unlimitedApprovalRisk = true
        }
    
        
        return {
            hasPermit,
            unlimitedApprovalRisk,
            reason: unlimitedApprovalRisk
                ? "PERMIT can potentially grant unlimited token approval."
                : "PERMIT found but no unlimited approval risk detected."
        }
}


module.exports = detectPermitPhishing;
