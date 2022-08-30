const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    deviceLocation: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

topicSchema.index({ uid: "text" });

const ModelName = "Topics";
const Topic = mongoose.model(ModelName, topicSchema);

module.exports = { Model: Topic, name: ModelName };
