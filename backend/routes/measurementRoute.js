const express = require("express");
const router = express.Router();
const measurementController = require("../controllers/measurementController");

// Route for creating a new measurement
router.post("/", measurementController.createMeasurement);

// Route for getting all measurements
router.get("/", measurementController.getAllMeasurements);

// Route for getting a single measurement by ID
router.get("/:id", measurementController.getMeasurementById);

// Route for updating a measurement by ID
router.put("/:id", measurementController.updateMeasurement);

// Route for deleting a measurement by ID
router.delete("/:id", measurementController.deleteMeasurement);

module.exports = router;
