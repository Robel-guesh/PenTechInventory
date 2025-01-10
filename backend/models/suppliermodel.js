const mongoose = require("mongoose");

// Define the schema for the Supplier model
const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true, // Supplier name is mandatory
    trim: true, // Remove any leading/trailing spaces
  },
  invoiceNumber: {
    type: String,
    required: true, // Invoice number is mandatory
    unique: true, // Ensure the invoice number is unique
    trim: true, // Remove any leading/trailing spaces
  },
});

// Create the Supplier model from the schema
const Supplier = mongoose.model("Supplier", supplierSchema);

// Export the Supplier model to use it in other parts of the app
module.exports = Supplier;
