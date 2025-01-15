const mongoose = require("mongoose");

// Define the schema for the Withdraw model
const withdrawSchema = new mongoose.Schema({
  customerName: {
    type: String,
    trim: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  goodsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "goods",
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
