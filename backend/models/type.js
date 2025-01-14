const mongoose = require("mongoose");

// Define the schema for the Type model
const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create and export the model
const type = mongoose.model("type", typeSchema);

module.exports = type;
