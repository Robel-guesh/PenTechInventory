const express = require("express");
const router = express.Router();
const measurementController = require("../controllers/measurementController");

// Routes for Measurement CRUD operations
router.post("/measurements", measurementController.createMeasurement); // Create a Measurement
router.get("/measurements", measurementController.getAllMeasurements); // Get all Measurements
router.get("/measurements/:id", measurementController.getMeasurementById); // Get a Measurement by ID
router.put("/measurements/:id", measurementController.updateMeasurement); // Update a Measurement by ID
router.delete("/measurements/:id", measurementController.deleteMeasurement); // Delete a Measurement by ID

module.exports = router;
