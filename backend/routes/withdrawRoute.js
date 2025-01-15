const express = require("express");
const router = express.Router();
const withdrawController = require("../controllers/withdrawController");

// Route for creating a withdraw
router.post("/", withdrawController.createWithdraw);

// Route for getting all withdraws
router.get("/", withdrawController.getAllWithdraws);

// Route for getting a single withdraw by ID
router.get("/:id", withdrawController.getWithdrawById);

// Route for updating a withdraw by ID
router.put("/:id", withdrawController.updateWithdraw);

// Route for deleting a withdraw by ID
router.delete("/:id", withdrawController.deleteWithdraw);

module.exports = router;
