// routes/withdrawRoutes.js
const express = require("express");
const router = express.Router();
const withdrawController = require("../controllers/withdrawController");

// Create a new withdraw
router.post("/create", withdrawController.createWithdraw);

// Approve a withdraw
router.post("/completeWithdraw", withdrawController.createCompleteWithdraw);
router.put("/approve/:id", withdrawController.approveWithdraw);

// Confirm a withdraw (subtract quantity from inventory)
router.put("/confirm/:id", withdrawController.confirmWithdraw);

// Return goods
router.post("/return", withdrawController.returnGoods);

// Get all withdraws
router.get("/", withdrawController.getAllWithdraws);

// Get a single withdraw by ID
router.get("/:id", withdrawController.getWithdrawById);

// Delete a withdraw by ID
router.delete("/:id", withdrawController.deleteWithdraw);

module.exports = router;
