const mongoose = require("mongoose");

// Define the schema for the Store model
const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true, // Ensures 'storeName' is mandatory
    trim: true, // Removes any leading or trailing whitespace
  },
  location: {
    type: String,
    required: true, // Ensures 'location' is mandatory
    trim: true, // Removes any leading or trailing whitespace
  },
  id: {
    type: String,
    required: true, // Store ID is mandatory
    unique: true, // Ensures 'id' is unique
    trim: true, // Removes any leading or trailing whitespace
  },
});

// Create the Store model from the schema
const Store = mongoose.model("Store", storeSchema);

// Export the Store model to use it in other parts of the app
module.exports = Store;
