const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  sex: {
    type: String,
  },
  id: {
    type: String,
    required: true, // ID is mandatory
    unique: true, // Ensure the ID is unique
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true, // Ensure the email is unique
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex to validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  photo: {
    type: String, // URL or path to the user's photo
    default: null, // Default to null if no photo is provided
  },
  role: {
    type: String,
    // enum: ["user", "admin", "manager"],
    default: "user",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
