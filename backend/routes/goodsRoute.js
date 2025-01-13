const express = require("express");
const router = express.Router();
const goodsController = require("../controllers/goodsController");

// Routes for Goods CRUD operations
router.post("/goods", goodsController.createGood); // Create a good
router.get("/goods", goodsController.getAllGoods); // Get all goods
router.get("/goods/:id", goodsController.getGoodById); // Get a good by ID
router.put("/goods/:id", goodsController.updateGood); // Update a good by ID
router.delete("/goods/:id", goodsController.deleteGood); // Delete a good by ID

module.exports = router;
