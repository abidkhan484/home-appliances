const mongoose = require("mongoose");
const { MongoError } = require("../../common/errors");

const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    isSuperAdmin: { type: Boolean },
    isAdmin: { type: Boolean },
    alias: { type: String, unique: true, required: true },
    // permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
    createdBY: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
  },
  { timestamps: true }
);

schema.index({ name: "text" });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

schema.index({ isSuperAdmin: 1 });
schema.index({ isAdmin: 1 });

schema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.message.includes("duplicate key error")) {
      const errorMessage = `Name already exists`;
      next(new MongoError(errorMessage));
    } else {
      next(new MongoError(error.message));
    }
  } else {
    next();
  }
});

const ModelName = "Roles";
const Roles = mongoose.model(ModelName, schema);
module.exports = { Model: Roles, name: ModelName };
