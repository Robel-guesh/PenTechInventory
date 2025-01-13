const express = require("express");
const router = express.Router();
const goodsStatusController = require("../controllers/goodsStatusController");

// Routes for GoodsStatus CRUD operations
router.post("/goods-status", goodsStatusController.createGoodsStatus); // Create a GoodsStatus
router.get("/goods-status", goodsStatusController.getAllGoodsStatus); // Get all GoodsStatus
router.get("/goods-status/:id", goodsStatusController.getGoodsStatusById); // Get a GoodsStatus by ID
router.put("/goods-status/:id", goodsStatusController.updateGoodsStatus); // Update a GoodsStatus by ID
router.delete("/goods-status/:id", goodsStatusController.deleteGoodsStatus); // Delete a GoodsStatus by ID

module.exports = router;
