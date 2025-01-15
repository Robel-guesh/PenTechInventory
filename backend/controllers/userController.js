const user = require("../models/user");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const userData = new user({
      isAdmin: req.body.isAdmin,
      isVerified: req.body.isVerified,
      name: req.body.name,
      sex: req.body.sex,
      id: req.body.id,
      email: req.body.email,
      password: req.body.password, // In a real-world scenario, you'd hash the password
      photo: req.body.photo,
      roleId: req.body.roleId,
    });

    await userData.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: userData });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating user" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await user
      .find()
      .populate("roleId", "name") // Populating role name
      .exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const userData = await user
      .findById(req.params.id)
      .populate("roleId", "name") // Populating role name
      .exec();

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the user" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const userData = await user.findByIdAndUpdate(
      req.params.id,
      {
        isAdmin: req.body.isAdmin,
        isVerified: req.body.isVerified,
        name: req.body.name,
        sex: req.body.sex,
        id: req.body.id,
        email: req.body.email,
        password: req.body.password, // In a real-world scenario, you'd hash the password
        photo: req.body.photo,
        roleId: req.body.roleId,
      },
      { new: true }
    );

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: userData });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userData = await user.findByIdAndDelete(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
