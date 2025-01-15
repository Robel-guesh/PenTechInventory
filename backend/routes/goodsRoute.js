const express = require("express");
const route = express.Router();
const goodsController = require("../controllers/goodsController");
const upload = require("../utils/fileUpload");
// Route for creating a new good

route.post("/", upload.array("photo"), goodsController.createGood);

// Route for getting all goods
route.get("/", goodsController.getAllGoods);

// Route for getting a single good by ID
route.get("/:id", goodsController.getGoodById);

// Route for updating a good by ID
route.put("/:id", upload.array("photo"), goodsController.updateGood);

// Route for deleting a good by ID
route.delete("/:id", goodsController.deleteGood);

module.exports = route;
