const express = require("express");
const router = express.Router();
const reasonController = require("../controllers/reasonController");

// Route for creating a reason
router.post("/", reasonController.createReason);

// Route for getting all reasons
router.get("/", reasonController.getAllReasons);

// Route for getting a single reason by ID
router.get("/:id", reasonController.getReasonById);

// Route for updating a reason by ID
router.put("/:id", reasonController.updateReason);

// Route for deleting a reason by ID
router.delete("/:id", reasonController.deleteReason);

module.exports = router;
