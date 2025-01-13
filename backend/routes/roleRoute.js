const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

// Routes for Role CRUD operations
router.post("/roles", roleController.createRole); // Create a Role
router.get("/roles", roleController.getAllRoles); // Get all Roles
router.get("/roles/:id", roleController.getRoleById); // Get a Role by ID
router.put("/roles/:id", roleController.updateRole); // Update a Role by ID
router.delete("/roles/:id", roleController.deleteRole); // Delete a Role by ID

module.exports = router;
