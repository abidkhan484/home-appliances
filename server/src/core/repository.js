const mongoose = require("mongoose");
const eventEmitter = require("./event-manager").getInstance();

const save = async (item, modelName) => {
  const model = new mongoose.models[modelName](item);
  const savedItem = await model.save();
  eventEmitter.emit(`${modelName} created`, savedItem);
  return savedItem;
};

const getById = async (id, modelName) => {
  const model = await mongoose.models[modelName].findById(id);
  if (model == null) {
    throw new Error(`${modelName} not found by the id: ${id}`);
  }
  return model;
};

module.exports = {
  save,
  getById,
};
