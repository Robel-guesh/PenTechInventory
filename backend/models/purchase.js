const mongoose = require("mongoose");

// Define the schema for the Purchase model
const purchaseSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "goods",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: false,
  },
  sellingPrice: {
    type: Number,
    required: false,
  },
  storeLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store", // Reference to store model
    required: true,
  },
  userId: {
    // Changed from userID to userId
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to user model
    required: true,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier", // Reference to supplier model
    required: true,
  },
  goodsStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "status",
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "type",
    required: true,
  },
});

// Create and export the model
const purchase = mongoose.model("purchase", purchaseSchema);

module.exports = purchase;
