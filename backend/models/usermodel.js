const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, // User name is mandatory
    trim: true, // Remove leading/trailing spaces
  },
  sex: {
    type: String,
    enum: ["male", "female", "other"], // Allowed sex values
    required: true, // Sex is mandatory
  },
  id: {
    type: String,
    required: true, // ID is mandatory
    unique: true, // Ensure the ID is unique
    trim: true, // Remove leading/trailing spaces
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true, // Ensure the email is unique
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex to validate email format
  },
  password: {
    type: String,
    required: true, // Password is mandatory
    minlength: 6, // Ensure password is at least 6 characters
  },
  photo: {
    type: String, // URL or path to the user's photo
    default: null, // Default to null if no photo is provided
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Allowed roles
    default: "user", // Default role is 'user'
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default to false (not an admin)
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password isn't modified, skip hashing

  try {
    // Hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create a method to compare passwords for authentication
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model to use it in other parts of the app
module.exports = User;
