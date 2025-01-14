const mongoose = require("mongoose");

// Define the schema for the Measurement model
const measurementSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Create and export the model
const measurement = mongoose.model("measurement", measurementSchema);

module.exports = measurement;
