const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");

// Route for creating a new purchase
router.post("/", purchaseController.createPurchase);

// Route for getting all purchases
router.get("/", purchaseController.getAllPurchases);

// Route for getting a single purchase by ID
router.get("/:id", purchaseController.getPurchaseById);

// Route for updating a purchase by ID
router.put("/:id", purchaseController.updatePurchase);

// Route for deleting a purchase by ID
router.delete("/:id", purchaseController.deletePurchase);

module.exports = router;
