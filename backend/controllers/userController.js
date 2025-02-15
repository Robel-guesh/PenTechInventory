const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Create a new user
exports.createUser = async (req, res) => {
  const photo = req.files ? req.files.map((file) => file.path) : [];
  console.log(photo, req.body, req.body.roleId._id);
  // const fetchedUser = await user.findOne({ id });
  // if( fetchedUser){
  //   return
  // }
  try {
    const userData = new user({
      isAdmin: req.body.isAdmin,
      isVerified: req.body.isVerified,
      name: req.body.name,
      sex: req.body.sex,
      id: req.body.id,
      email: req.body.email,
      password: req.body.password, // In a real-world scenario, you'd hash the password
      photo: photo,
      roleId: req.body.roleId || "67a5d5d1e875b0f18ffa8ff0",
    });

    await userData.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: userData });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating user", error });
  }
};
// Login user and generate token
exports.logInUser = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  try {
    const fetchedUser = await user
      .findOne({ email })
      .populate("roleId", "name");

    if (!fetchedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await fetchedUser.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign({ fetchedUser }, process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        _id: fetchedUser._id,
        isAdmin: fetchedUser.isAdmin,
        isVerified: fetchedUser.isVerified,
        name: fetchedUser.name,
        sex: fetchedUser.sex,
        email: fetchedUser.email,
        roleName: fetchedUser.roleId,
        photo: fetchedUser.photo,
        id: fetchedUser.id,
      },
      process.env.JWT_SECRET
    );
    const loggedUser = {
      _id: fetchedUser._id,
      isAdmin: fetchedUser.isAdmin,
      isVerified: fetchedUser.isVerified,
      name: fetchedUser.name,
      sex: fetchedUser.sex,
      email: fetchedUser.email,
      roleName: fetchedUser.roleId,
      photo: fetchedUser.photo,
      id: fetchedUser.id,
    };
    // console.log(token);

    // res.json({ message: "Login successful", token });
    res.json({ message: "Login successful", token, loggedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await user
      .find()
      .populate("roleId", "name") // Populating role name
      .exec();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};
exports.getTotalUsers = async (req, res) => {
  try {
    const userCount = await user.countDocuments(); // Returns the count of users
    res.status(200).json({ data: userCount + 1 });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving total users" });
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

    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the user" });
  }
};

// Update a user by ID
// Update a user by ID
exports.updateUser = async (req, res) => {
  const photo = req.files ? req.files.map((file) => file.path) : [];
  console.log(req.params.id, req.body, photo);
  console.log("type", typeof req.body.roleId);

  try {
    // Fetch the current user data to copy
    const userData = await user.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize hashedPassword if password is provided
    let hashedPassword = userData.password; // Retain the old password if not updating it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    // Make a copy of the user data and update only the fields provided in the request
    const updatedUserData = {
      ...userData.toObject(), // Convert mongoose document to plain object
      isAdmin:
        req.body.isAdmin !== undefined ? req.body.isAdmin : userData.isAdmin,
      isVerified:
        req.body.isVerified !== undefined
          ? req.body.isVerified
          : userData.isVerified,
      name: req.body.name || userData.name,
      sex: req.body.sex || userData.sex,
      id: req.body.id || userData.id,
      email: req.body.email || userData.email,
      password: hashedPassword, // Update password only if provided
      photo: photo.length > 0 ? photo : userData.photo, // Update photo if provided, else retain the old one
      roleId: req.body.roleId || userData.roleId,
      // roleId:
      //   typeof req.body.roleId === "object" && req.body.roleId !== null
      //     ? req.body.roleId._id
      //     : req.body.roleId || userData.roleId,
    };

    // Update the user in the database with the modified fields
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      updatedUserData,
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
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
