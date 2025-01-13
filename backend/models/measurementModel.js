const mongoose = require("mongoose");

// Define the schema for the Group model
const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

// Create the Group model from the schema
const MeasurementModel = mongoose.model("MeasurementModel", groupSchema);

// Export the model to use it in other files
module.exports = MeasurementModel;
