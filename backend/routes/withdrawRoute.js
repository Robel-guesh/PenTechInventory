const express = require("express");
const router = express.Router();
const withdrawController = require("../controllers/withdrawController");

// Routes for Withdraw CRUD operations
router.post("/withdraws", withdrawController.createWithdraw); // Create a Withdraw
router.get("/withdraws", withdrawController.getAllWithdraws); // Get all Withdraws
router.get("/withdraws/:id", withdrawController.getWithdrawById); // Get a Withdraw by ID
router.put("/withdraws/:id", withdrawController.updateWithdraw); // Update a Withdraw by ID
router.delete("/withdraws/:id", withdrawController.deleteWithdraw); // Delete a Withdraw by ID

// Route to update status of a Withdraw (approve, reject, etc.)
router.put("/withdraws/:id/status", withdrawController.updateWithdrawStatus); // Update Withdraw status

module.exports = router;
