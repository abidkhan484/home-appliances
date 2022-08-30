const { save } = require("./repository");

const saveHandler = async (req, res, next) => {
  try {
    const ModelName = req.modelName;
    const { body } = req;
    const id = await save(body, ModelName);
    __logger.info({ id }, `${ModelName} created`);
    return res
      .status(201)
      .send({ success: true, message: `${ModelName} created` });
  } catch (error) {
    return next(error, req, res);
  }
};

module.exports = {
  saveHandler,
};
