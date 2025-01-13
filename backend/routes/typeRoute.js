const express = require("express");
const router = express.Router();
const typeController = require("../controllers/typeController");

// Routes for Type CRUD operations
router.post("/types", typeController.createType); // Create a Type
router.get("/types", typeController.getAllTypes); // Get all Types
router.get("/types/:id", typeController.getTypeById); // Get a Type by ID
router.put("/types/:id", typeController.updateType); // Update a Type by ID
router.delete("/types/:id", typeController.deleteType); // Delete a Type by ID

module.exports = router;
