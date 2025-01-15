const status = require("../models/status");

// Create a new status
exports.createStatus = async (req, res) => {
  try {
    const statusData = new status({
      name: req.body.name,
    });

    await statusData.save();
    res
      .status(201)
      .json({ message: "Status created successfully", status: statusData });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating status" });
  }
};

// Get all statuses
exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await status.find();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving statuses" });
  }
};

// Get a single status by ID
exports.getStatusById = async (req, res) => {
  try {
    const statusData = await status.findById(req.params.id);

    if (!statusData) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json(statusData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the status" });
  }
};

// Update a status by ID
exports.updateStatus = async (req, res) => {
  try {
    const statusData = await status.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!statusData) {
      return res.status(404).json({ message: "Status not found" });
    }

    res
      .status(200)
      .json({ message: "Status updated successfully", status: statusData });
  } catch (error) {
    res.status(500).json({ error: "Error updating status" });
  }
};

// Delete a status by ID
exports.deleteStatus = async (req, res) => {
  try {
    const statusData = await status.findByIdAndDelete(req.params.id);

    if (!statusData) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json({ message: "Status deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting status" });
  }
};
