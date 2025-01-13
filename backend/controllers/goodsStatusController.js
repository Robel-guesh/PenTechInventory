const GoodsStatusModel = require("../models/goodsStatusModel"); // Import GoodsStatus model

// Create a new GoodsStatus
const createGoodsStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const newGoodsStatus = new GoodsStatusModel({
      name,
    });

    await newGoodsStatus.save(); // Save the new GoodsStatus to the database
    res.status(201).json(newGoodsStatus); // Respond with the newly created GoodsStatus
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating GoodsStatus", error: error.message });
  }
};

// Get all GoodsStatus
const getAllGoodsStatus = async (req, res) => {
  try {
    const goodsStatusList = await GoodsStatusModel.find(); // Fetch all GoodsStatus from the database
    res.status(200).json(goodsStatusList); // Return the list of GoodsStatus
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching GoodsStatus", error: error.message });
  }
};

// Get a GoodsStatus by ID
const getGoodsStatusById = async (req, res) => {
  try {
    const goodsStatus = await GoodsStatusModel.findById(req.params.id); // Find a specific GoodsStatus by ID

    if (!goodsStatus) {
      return res.status(404).json({ message: "GoodsStatus not found" });
    }

    res.status(200).json(goodsStatus); // Return the found GoodsStatus
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching GoodsStatus", error: error.message });
  }
};

// Update a GoodsStatus by ID
const updateGoodsStatus = async (req, res) => {
  try {
    const updatedGoodsStatus = await GoodsStatusModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated GoodsStatus
    );

    if (!updatedGoodsStatus) {
      return res.status(404).json({ message: "GoodsStatus not found" });
    }

    res.status(200).json(updatedGoodsStatus); // Respond with the updated GoodsStatus
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating GoodsStatus", error: error.message });
  }
};

// Delete a GoodsStatus by ID
const deleteGoodsStatus = async (req, res) => {
  try {
    const deletedGoodsStatus = await GoodsStatusModel.findByIdAndDelete(
      req.params.id
    ); // Delete the GoodsStatus by ID

    if (!deletedGoodsStatus) {
      return res.status(404).json({ message: "GoodsStatus not found" });
    }

    res.status(200).json({ message: "GoodsStatus deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting GoodsStatus", error: error.message });
  }
};

module.exports = {
  createGoodsStatus,
  getAllGoodsStatus,
  getGoodsStatusById,
  updateGoodsStatus,
  deleteGoodsStatus,
};
