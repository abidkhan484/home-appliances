const express = require("express");
const { getById } = require("../../core/repository");

const router = express.Router();
const { name: modelName } = require("./model");

const getAllDevices = async (req, res, next) => {
  try {
    const userId = "polymath"
    const deviceListOfUser = await getById(userId, modelName);
    return res.status(200).send({ success: true, message: deviceListOfUser });
  } catch (error) {
    next(error, req, res)
  }
}

const changeDeviceStatus = async (req, res, next) => {
  try {
    // the below line will be removed as it is hardcoded
    const userId = "polymath";
    const { topic } = req.params;

    const deviceListOfUser = await getById(userId, modelName);
    return res.status(200).send({ success: true, message: deviceListOfUser });
  } catch (error) {
    return next(error, req, res);
  }
};


router.get("/change-device-status/:topic", changeDeviceStatus);
router.get("/devices/all", getAllDevices);

module.exports = router;
