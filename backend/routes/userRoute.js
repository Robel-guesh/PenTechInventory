const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route for creating a new user
router.post("/", userController.createUser);

// Route for getting all users
router.get("/", userController.getAllUsers);

// Route for getting a single user by ID
router.get("/:id", userController.getUserById);

// Route for updating a user by ID
router.put("/:id", userController.updateUser);

// Route for deleting a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
