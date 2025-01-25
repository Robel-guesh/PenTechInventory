// models/returnedGoods.js
const mongoose = require("mongoose");

// Define the schema for the Returned Goods model
const returnedGoodsSchema = new mongoose.Schema({
  withdrawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "withdraw",
    required: true,
  },
  returnedQty: {
    type: Number,
    required: true,
  },
  returnDate: {
    type: Date,
    default: Date.now,
  },
  returnedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // The person returning the goods
    required: true,
  },
  reason: {
    type: String, // Reason for return (e.g., damaged, overstock, etc.)
    required: true,
  },
});

const ReturnedGoods = mongoose.model("ReturnedGoods", returnedGoodsSchema);

module.exports = ReturnedGoods;
