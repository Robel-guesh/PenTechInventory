const reason = require("../models/reason");

// Create a new reason
exports.createReason = async (req, res) => {
  try {
    const reasonData = new reason({
      name: req.body.name,
      // reason: req.body.reason,
    });

    await reasonData.save();
    res
      .status(201)
      .json({ message: "reason created successfully", data: reasonData });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating reason" });
  }
};

// Get all reasons
exports.getAllReasons = async (req, res) => {
  try {
    const reasons = await reason.find();
    res.status(200).json({ data: reasons });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving reasons" });
  }
};

// Get a single reason by ID
exports.getReasonById = async (req, res) => {
  try {
    const reasonData = await reason.findById(req.params.id);
    if (!reasonData) {
      return res.status(404).json({ message: "reason not found" });
    }
    res.status(200).json({ data: reasonData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the reason" });
  }
};

// Update a reason by ID
exports.updateReason = async (req, res) => {
  try {
    const reasonData = await reason.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!reasonData) {
      return res.status(404).json({ message: "reason not found" });
    }
    res
      .status(200)
      .json({ message: "reason updated successfully", data: reasonData });
  } catch (error) {
    res.status(500).json({ error: "Error updating reason" });
  }
};

// Delete a reason by ID
exports.deleteReason = async (req, res) => {
  try {
    const reasonData = await reason.findByIdAndDelete(req.params.id);
    if (!reasonData) {
      return res.status(404).json({ message: "reason not found" });
    }
    res.status(200).json({ message: "reason deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting reason" });
  }
};
