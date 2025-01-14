const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

// Route for creating a new role
router.post("/", roleController.createRole);

// Route for getting all roles
router.get("/", roleController.getAllRoles);

// Route for getting a single role by ID
router.get("/:id", roleController.getRoleById);

// Route for updating a role by ID
router.put("/:id", roleController.updateRole);

// Route for deleting a role by ID
router.delete("/:id", roleController.deleteRole);

module.exports = router;
