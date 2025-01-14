const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

// Route for creating a new status
router.post("/", statusController.createStatus);

// Route for getting all statuses
router.get("/", statusController.getAllStatuses);

// Route for getting a single status by ID
router.get("/:id", statusController.getStatusById);

// Route for updating a status by ID
router.put("/:id", statusController.updateStatus);

// Route for deleting a status by ID
router.delete("/:id", statusController.deleteStatus);

module.exports = router;
