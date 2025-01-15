const mongoose = require("mongoose");

// Define the schema for the Status model
const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create and export the model
const status = mongoose.model("status", statusSchema);

module.exports = status;
