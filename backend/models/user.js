const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false, // Default to false if not provided
  },
  isVerified: {
    type: Boolean,
    default: false, // Default to false if not provided
  },
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,

    required: true,
  },
  id: {
    type: String,
    // unique: true,
  },
  email: {
    type: String,

    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: [String],
    required: false, // Optional photo URL or path
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role", // Reference to the 'role' model
    required: true,
    default: "user",
  },
});

// Create and export the model
const user = mongoose.model("user", userSchema);

module.exports = user;
