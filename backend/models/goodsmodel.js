const mongoose = require("mongoose");

// Define the Goods schema
const goodsSchema = new mongoose.Schema({
  goodsName: {
    type: String,
    required: true, // Goods name is required
    trim: true, // Trim any leading or trailing spaces
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to a Category model (you can define the Category model separately)
    required: true,
  },
  unitOfMeasure: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true, // Quantity is required
    min: 0, // Ensure quantity cannot be negative
  },
  unitPrice: {
    type: Number,
    required: true, // Unit price is required
    min: 0, // Ensure price is not negative
  },
  sellingPrice: {
    type: Number,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GoodsStatus",
    required: true,
  },
  type: {
    type: String,
    // enum: ["Normal", "Prescription", "Perishable"],
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  prescription: {
    type: String,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  storeLocation: {
    type: String,
    required: true,
  },
  shortageLevel: {
    type: Number,
    required: true,
    min: 0,
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to a User model (you can define this separately)
    required: true,
  },
  photo: {
    type: String,
  },
});

const GoodsModel = mongoose.model("GoodsModel", goodsSchema);

// Export the Goods model to use it in other parts of the app
module.exports = GoodsModel;
