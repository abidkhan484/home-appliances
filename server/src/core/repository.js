const mongoose = require("mongoose");

const getById = async (id, modelName) => {
  __logger.error(`Error for ${modelName}`);
  console.log(mongoose.models);

  const model = await mongoose.models[modelName].findById(id);
  if (model == null) {
    throw new Error(`${modelName} not found by the id: ${id}`);
  }
  return model;
};

module.exports = { getById };
