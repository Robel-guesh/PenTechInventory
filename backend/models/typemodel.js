const mongoose = require("mongoose");

// Define the schema for the Type model
const typeSchema = new mongoose.Schema({
  typeName: {
    type: String,
  },
});

const Type = mongoose.model("Type", typeSchema);
module.exports = Type;
