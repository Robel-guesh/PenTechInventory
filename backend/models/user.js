const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    // required: true,
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Create and export the model
const user = mongoose.model("user", userSchema);

module.exports = user;
