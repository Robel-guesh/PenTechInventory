const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Route for creating a new store
router.post("/", storeController.createStore);

// Route for getting all stores
router.get("/", storeController.getAllStores);

// Route for getting a single store by ID
router.get("/:id", storeController.getStoreById);

// Route for updating a store by ID
router.put("/:id", storeController.updateStore);

// Route for deleting a store by ID
router.delete("/:id", storeController.deleteStore);

module.exports = router;
