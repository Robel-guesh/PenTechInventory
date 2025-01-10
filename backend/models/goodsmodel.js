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
    required: true, // Required field
    enum: ["kg", "pcs", "ltr", "m", "box"], // Example units, can be expanded
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
    required: true, // Selling price is required
    min: 0, // Ensure price is not negative
  },
  discount: {
    type: Number,
    min: 0, // Discount cannot be negative
    max: 100, // Discount can’t exceed 100%
    default: 0, // Default discount is 0
  },
  registeredDate: {
    type: Date,
    default: Date.now, // Default is the current date/time
  },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GoodsStatus", // Reference to a GoodsStatus model (you can define this separately)
    required: true,
  },
  type: {
    type: String,
    enum: ["Normal", "Prescription", "Perishable"], // Example types
    required: true, // Type is required
  },
  id: {
    type: String,
    required: true,
    unique: true, // ID should be unique (e.g., SKU or internal code)
    trim: true, // Remove leading/trailing spaces
  },
  prescription: {
    type: Boolean,
    default: false, // Default is false, meaning it doesn’t require a prescription
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier", // Reference to a Supplier model (you can define this separately)
    required: true,
  },
  storeLocation: {
    type: String,
    required: true, // Location is required
  },
  shortageLevel: {
    type: Number,
    required: true,
    min: 0, // Ensure shortage level can't be negative
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to a User model (you can define this separately)
    required: true,
  },
  photo: {
    type: String, // URL or path to the photo
    trim: true, // Trim any spaces
  },
});

// Create the Goods model from the schema
const Goods = mongoose.model("Goods", goodsSchema);

// Export the Goods model to use it in other parts of the app
module.exports = Goods;
