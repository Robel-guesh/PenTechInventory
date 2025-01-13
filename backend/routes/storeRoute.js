const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Routes for Store CRUD operations
router.post("/stores", storeController.createStore); // Create a Store
router.get("/stores", storeController.getAllStores); // Get all Stores
router.get("/stores/:id", storeController.getStoreById); // Get a Store by ID
router.put("/stores/:id", storeController.updateStore); // Update a Store by ID
router.delete("/stores/:id", storeController.deleteStore); // Delete a Store by ID

module.exports = router;
