const mongoose = require("mongoose");

// Define the schema for the Group model
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures 'name' is mandatory
    trim: true, // Removes whitespace from the name
  },
  quantity: {
    type: Number,
    required: true, // Ensures 'quantity' is mandatory
    min: 0, // Optional: ensures quantity can't be negative
  },
});

// Create the Group model from the schema
const Group = mongoose.model("Group", groupSchema);

// Export the model to use it in other files
module.exports = Group;
