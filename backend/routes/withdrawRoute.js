// routes/withdrawRoutes.js
const express = require("express");
const router = express.Router();
const withdrawController = require("../controllers/withdrawController");
const auth = require("../middleware/auth");
// Create a new withdraw
router.post("/create", auth, withdrawController.createWithdraw);

// Approve a withdraw
router.post(
  "/completeWithdraw",
  auth,
  withdrawController.createCompleteWithdraw
);
router.put("/approve/:id", auth, withdrawController.approveWithdraw);

// Confirm a withdraw (subtract quantity from inventory)
router.put("/confirm/:id", auth, withdrawController.confirmWithdraw);

// Return goods
router.post("/return", auth, withdrawController.returnGoods);

// Get all withdraws
router.get("/", auth, withdrawController.getAllWithdraws);

// Get a single withdraw by ID
router.get("/:id", auth, withdrawController.getWithdrawById);

// Delete a withdraw by ID
router.delete("/:id", auth, withdrawController.deleteWithdraw);

module.exports = router;
