const category = require("../models/category");

// Create a new status
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the category already exists
    const checkIfExists = await category.findOne({ name });

    if (checkIfExists) {
      // If category already exists, send an error response
      return res.status(400).json({ message: "Category already exists" });
    }

    // If category doesn't exist, create a new one
    const categoryData = new category({
      name,
    });

    await categoryData.save();
    res
      .status(201)
      .json({ message: "Category created successfully", data: categoryData });
  } catch (error) {
    // Catch any errors and send a response with error details
    res
      .status(500)
      .json({
        error: "Server error while creating category",
        details: error.message,
      });
  }
};

// Get all categoryes
const getAllCatagories = async (req, res) => {
  try {
    const categoryData = await category.find();
    res.status(200).json({ data: categoryData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving statuses" });
  }
};

// Get a single status by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryData = await category.findById(req.params.id);

    if (!categoryData) {
      return res.status(404).json({ message: "category not found" });
    }

    res.status(200).json({ data: categoryData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the category" });
  }
};

// Update a status by ID
const updateCategory = async (req, res) => {
  try {
    const categoryData = await category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!categoryData) {
      return res.status(404).json({ message: "category not found" });
    }

    res
      .status(200)
      .json({ message: "category updated successfully", data: categoryData });
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

// Delete a status by ID
const deleteCategory = async (req, res) => {
  try {
    const categoryData = await category.findByIdAndDelete(req.params.id);

    if (!categoryData) {
      return res.status(404).json({ message: "category not found" });
    }

    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
module.exports = {
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCatagories,
  createCategory,
};
