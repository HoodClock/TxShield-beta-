const phishingHelper = require("../helpers/phishing.helper");
const {getAddress} = require("ethers")

const MasterPhishingController = async (req, res) => {
  const { userAddress, recepientAddress, amount, currencySymbol } = req.body;

  try {

    const checkSumRecepientAddress = getAddress(recepientAddress);

    const [approveScam, etherForwarding] = await Promise.all([
      phishingHelper.phishingApproveScam(
        userAddress,
        recepientAddress,
        amount,
        currencySymbol
      ),
      phishingHelper.phishingEtherForwardScam(checkSumRecepientAddress)
    ]);
  
    return res.status(200).json({
      success: true,
      checks: {
          approveScam,
          etherForwarding
      }
    });
  } catch (err) {
    console.error("Internal Server Error, can't resolve phishing checks.")
    return res.status(500).json({success: false, error: err.message}) 
  }

};

module.exports = MasterPhishingController;