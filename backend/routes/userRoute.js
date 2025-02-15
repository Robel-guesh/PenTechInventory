const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../utils/fileUpload");
const auth = require("../middleware/auth");
// Route for creating a new user
router.post("/", upload.array("photo"), userController.createUser);

// Route for getting all users
router.get("/", auth, userController.getAllUsers);

// Route for getting a single user by ID
router.get("/:id", auth, userController.getUserById);

// Route for updating a user by ID
router.put("/:id", auth, upload.array("photo"), userController.updateUser);
router.get("/api/totalUsers", auth, userController.getTotalUsers);
router.post("/api/login", userController.logInUser);
// Route for deleting a user by ID
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
