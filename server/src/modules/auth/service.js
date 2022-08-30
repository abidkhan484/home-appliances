const bcrypt = require("bcrypt");
const { Model, name: ModelName } = require("./model");
const { save } = require("../../core/repository");

const getPasswordHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const createUser = async (user) => {
  const passwordHash = await getPasswordHash(user.password);
  const { _id } = await save({ passwordHash, ...user }, ModelName);
  return _id;
};

const tryCreateUser = async (user) => {
  const { username, phoneNumber, email } = user;
  const query = {
    $or: [{ phoneNumber }, { email }, { username }],
  };
  const item = await Model.findOne(query);
  if (item) {
    return false;
  }
  const id = await createUser(user);
  return id;
};

module.exports = {
  tryCreateUser,
};
