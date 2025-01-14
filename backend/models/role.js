const mongoose = require("mongoose");

// Define the schema for the Role model
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create and export the model
const role = mongoose.model("role", roleSchema);

module.exports = role;
