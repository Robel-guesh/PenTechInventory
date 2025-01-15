const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../utils/fileUpload");
// Route for creating a new user
router.post("/", upload.array("photo"), userController.createUser);

// Route for getting all users
router.get("/", userController.getAllUsers);

// Route for getting a single user by ID
router.get("/:id", userController.getUserById);

// Route for updating a user by ID
router.put("/:id", upload.array("photo"), userController.updateUser);

// Route for deleting a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
