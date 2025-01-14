const mongoose = require("mongoose");

// Define the schema for the Withdraw model
const withdrawSchema = new mongoose.Schema({
  customerName: {
    type: String,
    trim: true,
    required: false, // Not required
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  goodsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "goods",
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  reasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reason",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const withdraw = mongoose.model("withdraw", withdrawSchema);

module.exports = withdraw;
