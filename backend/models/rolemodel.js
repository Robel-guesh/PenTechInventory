const mongoose = require("mongoose");

// Define the schema for the Role model
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "user",
  },
});

// Create the Role model from the schema
const RoleModel = mongoose.model("RoleModel", roleSchema);

// Export the model to use it in other parts of the app
module.exports = RoleModel;
