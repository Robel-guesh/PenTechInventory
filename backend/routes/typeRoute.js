const express = require("express");
const router = express.Router();
const typeController = require("../controllers/typeController");

// Route for creating a new type
router.post("/", typeController.createType);

// Route for getting all types
router.get("/", typeController.getAllTypes);

// Route for getting a single type by ID
router.get("/:id", typeController.getTypeById);

// Route for updating a type by ID
router.put("/:id", typeController.updateType);

// Route for deleting a type by ID
router.delete("/:id", typeController.deleteType);

module.exports = router;
