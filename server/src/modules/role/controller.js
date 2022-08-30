const express = require("express");
const { handleValidation } = require("../../common/middlewares");
const { validate } = require("./request");
const { saveHandler } = require("../../core/controller");

const router = express.Router();

router.post("/create", handleValidation(validate), saveHandler);

module.exports = router;
