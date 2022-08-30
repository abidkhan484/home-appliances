const Joi = require("joi");

const commonKeys = {
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  username: Joi.string().min(3).max(20).required(),
  address: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(5).max(15).required(),
  email: Joi.string().min(5).max(30).required(),
  password: Joi.string().required(),
  confirm: Joi.string().required.valid(Joi.ref("password")),
};

const registrationSchema = Joi.object().keys({
  ...commonKeys,
});

const validateRegistration = (data) => {
  const result = registrationSchema.validate(data);
  result.value = { roleName: "user", ...data };
  return result;
};

module.exports = {
  validateRegistration,
};
