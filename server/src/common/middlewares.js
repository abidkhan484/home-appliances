
const handleValidation = (validate) => (req, res, next) => {
  const result = validate(req.body, req.user);
  console.log(result)
  const isValid = result.error == null;
  if (isValid) {
    req.body = result.value;
    return next();
  }
};

module.exports = {
  handleValidation,
};
