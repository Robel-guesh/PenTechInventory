const measurement = require("../models/measurement");

// Create a new measurement
exports.createMeasurement = async (req, res) => {
  const { name } = req.body;
  try {
    const checkIfExists = await measurement.findOne({ name });

    if (checkIfExists) {
      // If category already exists, send an error response
      return res.status(400).json({ message: "measuremnt already exists " });
    }
    const measurementData = new measurement({
      groupName: req.body.groupName,
      name: req.body.name,
      quantity: req.body.quantity,
    });

    await measurementData.save();
    res.status(201).json({
      message: "Measurement created successfully",
      data: measurementData,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating measurement" });
  }
};

// Get all measurements
exports.getAllMeasurements = async (req, res) => {
  try {
    const measurements = await measurement.find();
    res.status(200).json({ data: measurements });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving measurements" });
  }
};

// Get a single measurement by ID
exports.getMeasurementById = async (req, res) => {
  try {
    const measurementData = await measurement.findById(req.params.id);

    if (!measurementData) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json({ data: measurementData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the measurement" });
  }
};

// Update a measurement by ID
exports.updateMeasurement = async (req, res) => {
  try {
    const measurementData = await measurement.findByIdAndUpdate(
      req.params.id,
      {
        groupName: req.body.groupName,
        name: req.body.name,
        quantity: req.body.quantity,
      },
      { new: true }
    );

    if (!measurementData) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json({
      message: "Measurement updated successfully",
      data: measurementData,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating measurement" });
  }
};

// Delete a measurement by ID
exports.deleteMeasurement = async (req, res) => {
  try {
    const measurementData = await measurement.findByIdAndDelete(req.params.id);

    if (!measurementData) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json({ message: "Measurement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting measurement" });
  }
};
