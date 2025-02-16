const mongoose = require("mongoose");

// Define the schema for the Store model
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

// Create and export the model
const store = mongoose.model("store", storeSchema);

module.exports = store;
