const mongoose = require("mongoose");

// Define the schema for the Supplier model
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: false,
  },
});

// Create and export the model
const supplier = mongoose.model("supplier", supplierSchema);

module.exports = supplier;
