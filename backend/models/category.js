const mongoose = require("mongoose");

// Define the schema for the Status model
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
// Create and export the model
const category = mongoose.model("category", categorySchema);

module.exports = category;
