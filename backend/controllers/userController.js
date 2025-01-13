const userModel = require("../models/userModel"); // Import User model
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing and comparison
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation

// Create a new User
const createUser = async (req, res) => {
  try {
    const { id, email, password, sex, photo, role } = req.body;

    // Check if the user already exists
    const userExists = await UserModel.findOne({ $or: [{ email }, { id }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email or ID already exists" });
    }

    // Create a new User instance
    const newUser = new UserModel({
      id,
      email,
      password,
      sex,
      photo,
      role,
    });

    // Save the new user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating User", error: error.message });
  }
};

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all Users from the database
    res.status(200).json(users); // Return the list of Users
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Users", error: error.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id); // Find a specific User by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return the found User
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching User", error: error.message });
  }
};

// Update User by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated User
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Respond with the updated User
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating User", error: error.message });
  }
};

// Delete User by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id); // Delete the User by ID

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting User", error: error.message });
  }
};

// Authenticate User (Login)
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }); // Find the user by email

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expiration time (1 hour)
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authUser,
};
