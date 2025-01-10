const mongoose = require("mongoose");

// Define the schema for the Role model
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures 'name' is mandatory
    unique: true, // Ensures 'name' is unique
    trim: true, // Removes any leading or trailing whitespace
  },
});

// Create the Role model from the schema
const Role = mongoose.model("Role", roleSchema);

// Export the model to use it in other parts of the app
module.exports = Role;
