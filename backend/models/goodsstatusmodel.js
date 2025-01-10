const mongoose = require("mongoose");

// Define the schema for the GoodsStatus model
const goodsStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures 'name' is mandatory
    unique: true, // Ensures 'name' is unique
    trim: true, // Removes any leading or trailing whitespace
  },
});

// Create the GoodsStatus model from the schema
const GoodsStatus = mongoose.model("GoodsStatus", goodsStatusSchema);

// Export the model to use it in other parts of the app
module.exports = GoodsStatus;
