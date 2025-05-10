const honeypotServices = require("../services/honeypotServices");

// for blackList service

const blacklistController = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(401).json({ message: "Address is missing" });
    }

    const response = await honeypotServices.detectBlackListService(address);

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(204).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for disable_transfer_service

const disableTrasnferController = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(401).json({ message: "Address is missing" });
    }

    const response = await honeypotServices.detectDisableTransferService(
      address
    );

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(204).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for fake_balance_service

const fakeBalanceController = async (req, res) => {
  try {
    const { tokenAddress } = req.body;

    if (!tokenAddress) {
      return res.status(401).json({ message: "Token address is missing" });
    }

    const response = await honeypotServices.detectFakeBalanceService(
      tokenAddress
    );

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(204).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for gas_trap_service
const gasTrapController = async (req, res) => {
  try {
    const { userAddres, recepientAddress, value } = req.body;

    if (!userAddres || !recepientAddress || !value) {
      return res.status(401).json({
        message: "User address / Recepient address & amount not sent.",
      });
    }

    const response = await honeypotServices.detecGasTrapService(
      userAddres,
      recepientAddress,
      value
    );

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(204).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for hidden_owner_service

const hiddenOwnerController = async (req, res) => {
  try {
    const { contractAddress } = req.body;

    if (!contractAddress) {
      return res.status(401).json({ message: "Contract address is missing." });
    }

    const response = await honeypotServices.detectHiddenOwnerService(
      contractAddress
    );

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(204).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for high_sell_tax_service
const highSellTaxController = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(401).json({ message: "Address is missing." });
    }

    const response = await honeypotServices.detectHighSellTaxService(address);

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(204).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for buy_sell_service
const honeypotBuySellController = async (req, res) => {
  try {
    const { userAddress, tokenAddress, value } = req.body;

    if (!userAddress || !tokenAddress || !value) {
      return res
        .status(401)
        .json({ message: "User / Token address & amount is missing" });
    }

    const response = await honeypotServices.detectHoneyPotBuySellService(
      userAddress,
      tokenAddress,
      value
    );

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(204).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for mint_access_service

const mintAccessController = async (req, res) => {
  try {
    const { contractAddress } = req.body;

    if (!contractAddress) {
      return res.status(401).json({ message: "Contract address is missing." });
    }

    const response = await honeypotServices.detectMintAccessService(
      contractAddress
    );

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(200).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// for trading_control_service

const tradingcontrolController = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(401).json({ message: "Address is missing." });
    }

    const response = await honeypotServices.detectTradingControlService(
      address
    );

    if (response.success) {
      return res.status(200).json({ success: true, data: response });
    } else {
      return res.status(200).json({ success: false, error: response.message });
    }
  } catch (err) {
    console.error("Controller Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
    blacklistController,
    disableTrasnferController,
    fakeBalanceController,
    gasTrapController,
    hiddenOwnerController,
    highSellTaxController,
    honeypotBuySellController,
    mintAccessController,
    tradingcontrolController    
}
