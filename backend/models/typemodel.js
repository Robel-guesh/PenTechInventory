const mongoose = require("mongoose");

// Define the schema for the Type model
const typeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    enum: ["temporary", "fixed"], // Only "temporary" or "fixed" are valid
    required: true, // This field is mandatory
  },
});

// Create the Type model from the schema
const Type = mongoose.model("Type", typeSchema);

// Export the Type model to use it in other parts of the app
module.exports = Type;
