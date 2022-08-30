const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    alias: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    createdBy: {
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

resourceSchema.index({ name: "text" });
resourceSchema.index({ type: 1 });

resourceSchema.index({ createdAt: 1 });
resourceSchema.index({ updatedAt: 1 });

const ModelName = "Resources"
const Resources = mongoose.model(ModelName, resourceSchema)

module.exports = {Model: Resources, name: ModelName}
