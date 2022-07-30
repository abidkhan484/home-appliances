const mongoose = require("mongoose");
require("dotenv").config()

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

console.log(uri);


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
};

const connectWithDB = async (cb, em) => {
  const connectionResult = await mongoose.connect(uri, options);

  if (cb && em) cb(em);
}

module.exports = connectWithDB;
