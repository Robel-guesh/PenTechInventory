const Type = require("../models/typeModel"); // Import Type model

// Create a new Type
const createType = async (req, res) => {
  try {
    const { typeName } = req.body;

    // Create a new Type instance
    const newType = new Type({
      typeName,
    });

    await newType.save(); // Save the new type to the database
    res.status(201).json(newType); // Respond with the newly created type
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Type", error: error.message });
  }
};

// Get all Types
const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find(); // Fetch all Types from the database
    res.status(200).json(types); // Return the list of Types
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Types", error: error.message });
  }
};

// Get a Type by ID
const getTypeById = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id); // Find a specific Type by ID

    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json(type); // Return the found Type
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Type", error: error.message });
  }
};

// Update a Type by ID
const updateType = async (req, res) => {
  try {
    const updatedType = await Type.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated Type
    );

    if (!updatedType) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json(updatedType); // Respond with the updated Type
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Type", error: error.message });
  }
};

// Delete a Type by ID
const deleteType = async (req, res) => {
  try {
    const deletedType = await Type.findByIdAndDelete(req.params.id); // Delete the Type by ID

    if (!deletedType) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ message: "Type deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Type", error: error.message });
  }
};

module.exports = {
  createType,
  getAllTypes,
  getTypeById,
  updateType,
  deleteType,
};
