const StoreModel = require("../models/storeModel"); // Import Store model

// Create a new Store
const createStore = async (req, res) => {
  try {
    const { storeName, location, id } = req.body;

    // Create a new Store instance
    const newStore = new StoreModel({
      storeName,
      location,
      id,
    });

    await newStore.save(); // Save the new store to the database
    res.status(201).json(newStore); // Respond with the newly created store
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Store", error: error.message });
  }
};

// Get all Stores
const getAllStores = async (req, res) => {
  try {
    const stores = await StoreModel.find(); // Fetch all Stores from the database
    res.status(200).json(stores); // Return the list of Stores
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Stores", error: error.message });
  }
};

// Get a Store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await StoreModel.findById(req.params.id); // Find a specific Store by ID

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store); // Return the found Store
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Store", error: error.message });
  }
};

// Update a Store by ID
const updateStore = async (req, res) => {
  try {
    const updatedStore = await StoreModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated Store
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore); // Respond with the updated Store
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Store", error: error.message });
  }
};

// Delete a Store by ID
const deleteStore = async (req, res) => {
  try {
    const deletedStore = await StoreModel.findByIdAndDelete(req.params.id); // Delete the Store by ID

    if (!deletedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Store", error: error.message });
  }
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
};
