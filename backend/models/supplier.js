const mongoose = require("mongoose");

// Define the schema for the Supplier model
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create and export the model
const supplier = mongoose.model("supplier", supplierSchema);

module.exports = supplier;
