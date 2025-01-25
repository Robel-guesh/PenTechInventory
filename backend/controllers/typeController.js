const type = require("../models/type");

// Create a new type
exports.createType = async (req, res) => {
  try {
    const typeData = new type({
      name: req.body.name,
    });

    await typeData.save();
    res
      .status(201)
      .json({ message: "Type created successfully", data: typeData });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating type" });
  }
};

// Get all types
exports.getAllTypes = async (req, res) => {
  try {
    const types = await type.find();
    res.status(200).json({ data: types });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving types" });
  }
};

// Get a single type by ID
exports.getTypeById = async (req, res) => {
  try {
    const typeData = await type.findById(req.params.id);

    if (!typeData) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ data: typeData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the type" });
  }
};

// Update a type by ID
exports.updateType = async (req, res) => {
  try {
    const typeData = await type.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!typeData) {
      return res.status(404).json({ message: "Type not found" });
    }

    res
      .status(200)
      .json({ message: "Type updated successfully", data: typeData });
  } catch (error) {
    res.status(500).json({ error: "Error updating type" });
  }
};

// Delete a type by ID
exports.deleteType = async (req, res) => {
  try {
    const typeData = await type.findByIdAndDelete(req.params.id);

    if (!typeData) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting type" });
  }
};
