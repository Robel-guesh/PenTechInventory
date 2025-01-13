const MeasurementModel = require("../models/measurementModel"); // Import Measurement model

// Create a new Measurement
const createMeasurement = async (req, res) => {
  try {
    const { groupName, name, quantity } = req.body;

    const newMeasurement = new MeasurementModel({
      groupName,
      name,
      quantity,
    });

    await newMeasurement.save(); // Save the new Measurement to the database
    res.status(201).json(newMeasurement); // Respond with the newly created Measurement
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Measurement", error: error.message });
  }
};

// Get all Measurements
const getAllMeasurements = async (req, res) => {
  try {
    const measurements = await MeasurementModel.find(); // Fetch all Measurements from the database
    res.status(200).json(measurements); // Return the list of Measurements
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Measurements", error: error.message });
  }
};

// Get a Measurement by ID
const getMeasurementById = async (req, res) => {
  try {
    const measurement = await MeasurementModel.findById(req.params.id); // Find a specific Measurement by ID

    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json(measurement); // Return the found Measurement
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Measurement", error: error.message });
  }
};

// Update a Measurement by ID
const updateMeasurement = async (req, res) => {
  try {
    const updatedMeasurement = await MeasurementModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated Measurement
    );

    if (!updatedMeasurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json(updatedMeasurement); // Respond with the updated Measurement
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Measurement", error: error.message });
  }
};

// Delete a Measurement by ID
const deleteMeasurement = async (req, res) => {
  try {
    const deletedMeasurement = await MeasurementModel.findByIdAndDelete(
      req.params.id
    ); // Delete the Measurement by ID

    if (!deletedMeasurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json({ message: "Measurement deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Measurement", error: error.message });
  }
};

module.exports = {
  createMeasurement,
  getAllMeasurements,
  getMeasurementById,
  updateMeasurement,
  deleteMeasurement,
};
