const mongoose = require("mongoose");

// Define the schema for the Store model
const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
  },
  location: {
    type: String,
  },
  id: {
    type: String,
  },
});

// Create the Store model from the schema
const StoreModel = mongoose.model("StoreModel", storeSchema);

// Export the Store model to use it in other parts of the app
module.exports = StoreModel;
