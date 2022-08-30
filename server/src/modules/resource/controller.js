const express = require("express");
const {
  saveHandler,
} = require("../../core/controller");
const { validate } = require("./request");
const { handleValidation } = require("../../common/middlewares");

const router = express.Router();

router.post("/create", handleValidation(validate), saveHandler);

module.exports = router;
