const mongoose = require("mongoose");
const eventEmitter = require("./event-manager").getInstance();

const save = async (item, modelName) => {
  const model = new mongoose.models[modelName](item);
  const savedItem = await model.save();
  eventEmitter.emit(`${modelName} created`, savedItem);
  return savedItem;
};

const getById = async (id, modelName) => {
  __logger.error(`Error for ${modelName}`);
  console.log(modelName);

  const model = await mongoose.models[modelName].findById(
    "62f8d0d56ba269258455bbe3"
  );
  if (model == null) {
    throw new Error(`${modelName} not found by the id: ${id}`);
  }
  return model;
};

module.exports = {
  save,
  getById,
};
