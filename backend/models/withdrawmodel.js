const mongoose = require("mongoose");

// Define the schema for the Withdraw model
const withdrawSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true, // Customer name is mandatory
    trim: true, // Remove any leading/trailing spaces
  },
  nameOfGoods: {
    type: String,
    required: true, // Goods name is mandatory
    trim: true, // Remove any leading/trailing spaces
  },
  amount: {
    type: Number,
    required: true, // Amount is mandatory
    min: 0, // Ensure the amount can't be negative
  },
  date: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
  reason: {
    type: String,
    enum: ["gift", "internaluse", "sells"], // Reason can only be one of these
    required: true, // Reason is mandatory
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"], // Enum for status
    default: "pending", // Default status is 'pending'
  },
  returned: {
    type: Boolean,
    default: false, // Default is false (goods have not been returned)
  },
  sellerName: {
    type: String,
    required: true, // Seller name is mandatory
    trim: true, // Remove any leading/trailing spaces
  },
});

// Create the Withdraw model from the schema
const Withdraw = mongoose.model("Withdraw", withdrawSchema);

// Export the Withdraw model to use it in other parts of the app
module.exports = Withdraw;
