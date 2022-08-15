const express = require("express");
const { getById } = require("../../core/repository");

const router = express.Router();
const modelName = "Topic";

const changeDeviceStatus = async (req, res, next) => {
  try {
    // the below line will be removed as it is hardcoded
    const userId = "polymath";
    const { topic } = req.params;
    console.log(topic);

    const deviceListOfUser = await getById(userId, modelName);
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/change-device-status/:topic", changeDeviceStatus);

module.exports = router;
