const mongoose = require("mongoose");

// Define the schema for the Goods model
const goodsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  catagoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category", // Reference to category model
    required: true,
  },
  unitOfMeasureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "measurement", // Reference to measurement model
    required: true,
  },
  qty: {
    type: Number,

    default: 0,
  },
  photo: {
    type: [String],
    required: false, // Optional photo URL or path
  },
  description: {
    type: String,
    required: false, // Optional description
  },
  shortageLevel: {
    type: Number,
    required: true,
  },
});

// Create and export the model
const goods = mongoose.model("goods", goodsSchema);

module.exports = goods;
