// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TxShieldTrap {
    string public name = "Txshield Trap";
    string public symbol = "TRAP";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    uint256 public launchTime;
    address public owner;

    mapping(address => uint256) public  balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    modifier onlyOwner(){
        require(msg.sender == owner, "Not Owner");
        _;
    }


    constructor(){
        owner = msg.sender;
        launchTime = block.timestamp;
        // initial mint
        _mint(msg.sender, 1_000_000 * 10**18);
    }

    function _mint(address to, uint256 amount)internal {
        totalSupply += amount;
        balanceOf[to] += amount;
    }


    // to mint the token later
    function airdrop(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // time travel trading restrictions
    function transfer(address from, address to, uint256 amount) external returns (bool){
        _checkTimeLock();

        // simple transfer
        allowance[from][msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool){
        _checkTimeLock();

        // simple transferFrom
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool){
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function _checkTimeLock() internal view {
        if (msg.sender != owner){
            require(block.timestamp >= launchTime + 7 days, "Trading locked for 7 days");
        }
    }
}
