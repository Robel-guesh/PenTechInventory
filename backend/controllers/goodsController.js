const GoodsModel = require("../models/goodsModel"); // Import Goods model

// Create a new Good
const createGood = async (req, res) => {
  try {
    const {
      goodsName,
      categoryId,
      unitOfMeasure,
      qty,
      unitPrice,
      sellingPrice,
      discount,
      statusId,
      type,
      id,
      prescription,
      supplierId,
      storeLocation,
      shortageLevel,
      registeredBy,
      photo,
    } = req.body;

    const newGood = new GoodsModel({
      goodsName,
      categoryId,
      unitOfMeasure,
      qty,
      unitPrice,
      sellingPrice,
      discount,
      statusId,
      type,
      id,
      prescription,
      supplierId,
      storeLocation,
      shortageLevel,
      registeredBy,
      photo,
    });

    await newGood.save(); // Save the new good to the database
    res.status(201).json(newGood); // Respond with the newly created good
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating good", error: error.message });
  }
};

// Get all goods
const getAllGoods = async (req, res) => {
  try {
    const goods = await GoodsModel.find()
      .populate("categoryId")
      .populate("statusId")
      .populate("supplierId")
      .populate("registeredBy"); // Optionally populate the references

    res.status(200).json(goods); // Return all goods
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching goods", error: error.message });
  }
};

// Get a good by ID
const getGoodById = async (req, res) => {
  try {
    const good = await GoodsModel.findById(req.params.id)
      .populate("categoryId")
      .populate("statusId")
      .populate("supplierId")
      .populate("registeredBy"); // Optionally populate the references

    if (!good) {
      return res.status(404).json({ message: "Good not found" });
    }

    res.status(200).json(good); // Return the good by ID
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching good", error: error.message });
  }
};

// Update a good by ID
const updateGood = async (req, res) => {
  try {
    const updatedGood = await GoodsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated good
    );

    if (!updatedGood) {
      return res.status(404).json({ message: "Good not found" });
    }

    res.status(200).json(updatedGood); // Respond with updated good
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating good", error: error.message });
  }
};

// Delete a good by ID
const deleteGood = async (req, res) => {
  try {
    const deletedGood = await GoodsModel.findByIdAndDelete(req.params.id);

    if (!deletedGood) {
      return res.status(404).json({ message: "Good not found" });
    }

    res.status(200).json({ message: "Good deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting good", error: error.message });
  }
};

module.exports = {
  createGood,
  getAllGoods,
  getGoodById,
  updateGood,
  deleteGood,
};
