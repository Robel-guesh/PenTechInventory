const mongoose = require("mongoose");

// Define the schema for the reason model
const reasonSchema = new mongoose.Schema({
  name: {
    type: String,

    required: false, // Not required
  },
});

// Create and export the model
const reason = mongoose.model("reason", reasonSchema);

module.exports = reason;
