const mongoose = require("mongoose");

// Define the schema for the GoodsStatus model
const goodsStatusSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

// Create the GoodsStatus model from the schema
const GoodsStatusModel = mongoose.model("GoodsStatusModel", goodsStatusSchema);

// Export the model to use it in other parts of the app
module.exports = GoodsStatusModel;
