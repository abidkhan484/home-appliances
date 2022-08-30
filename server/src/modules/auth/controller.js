const express = require("express");
// const { handleValidation } = require("../../common/middlewares");
// const { validateRegistration } = require("./request");
const { tryCreateUser } = require("./service");

const router = express.Router();

const createUserHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const id = await tryCreateUser(user);

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User already exists by username or email or phone number.",
      });
    }

    return res
      .status(201)
      .send({ status: "ok", message: "User created successfully", id });
  } catch (error) {
    return next(error);
  }
};

router.post(
  "/register",
  // handleValidation(validateRegistration),
  createUserHandler
);

module.exports = router;
