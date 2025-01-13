const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes for User CRUD operations
router.post("/users", userController.createUser); // Create a User
router.get("/users", userController.getAllUsers); // Get all Users
router.get("/users/:id", userController.getUserById); // Get a User by ID
router.put("/users/:id", userController.updateUser); // Update a User by ID
router.delete("/users/:id", userController.deleteUser); // Delete a User by ID

// Route for user login (authentication)
router.post("/login", userController.authUser); // Authenticate User (Login)

module.exports = router;
