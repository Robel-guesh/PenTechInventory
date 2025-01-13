const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  nameOfGoods: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  returned: {
    type: Boolean,
    default: false,
  },
  sellerName: {
    type: String,
    required: true,
  },
});

const WithdrawModel = mongoose.model("WithdrawModel", withdrawSchema);

module.exports = WithdrawModel;
