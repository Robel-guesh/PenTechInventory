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
    trim: true,
  },
  sex: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  photo: {
    type: String,
    required: false, // Optional photo URL or path
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role", // Reference to the 'role' model
    required: true,
  },
});

// Create and export the model
const user = mongoose.model("user", userSchema);

module.exports = user;
