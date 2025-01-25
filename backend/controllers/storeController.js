const store = require("../models/store");

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const storeData = new store({
      name: req.body.name,
      location: req.body.location,
    });

    await storeData.save();
    res
      .status(201)
      .json({ message: "Store created successfully", data: storeData });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating store" });
  }
};

// Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await store.find();
    res.status(200).json({ data: stores });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving stores" });
  }
};

// Get a single store by ID
exports.getStoreById = async (req, res) => {
  try {
    const storeData = await store.findById(req.params.id);

    if (!storeData) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ data: storeData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the store" });
  }
};

// Update a store by ID
exports.updateStore = async (req, res) => {
  try {
    const storeData = await store.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, location: req.body.location },
      { new: true }
    );

    if (!storeData) {
      return res.status(404).json({ message: "Store not found" });
    }

    res
      .status(200)
      .json({ message: "Store updated successfully", data: storeData });
  } catch (error) {
    res.status(500).json({ error: "Error updating store" });
  }
};

// Delete a store by ID
exports.deleteStore = async (req, res) => {
  try {
    const storeData = await store.findByIdAndDelete(req.params.id);

    if (!storeData) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting store" });
  }
};
