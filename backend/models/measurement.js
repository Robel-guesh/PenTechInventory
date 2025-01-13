const mongoose = require("mongoose");
const measurementSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
});

const Measurement = mongoose.model("Measurement", measurementSchema);
