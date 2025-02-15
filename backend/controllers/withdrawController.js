// controllers/withdrawController.js
const withdraw = require("../models/withdraw");
const goods = require("../models/goods");
const reason = require("../models/reason");
const ReturnedGoods = require("../models/returnedGoods");

// Create a new withdraw (for internal/external use)
exports.createWithdraw = async (req, res) => {
  // console.log(req.body);
  try {
    const {
      customerName,
      customerId,
      goodsId,
      sellerId,
      qty,
      reasonId,
      date,
      status,
      sellingPrice,
    } = req.body;

    const goodsData = await goods.findById(goodsId);
    if (!goodsData) {
      return res.status(400).json({ error: "Goods not found" });
    }

    if (goodsData.qty < qty) {
      return res.status(400).json({ error: "Not enough goods in stock" });
    }

    const withdrawData = new withdraw({
      customerName,
      customerId,
      goodsId,
      sellerId,
      qty,
      reasonId,
      sellingPrice: sellingPrice || 0,
      isPending: status === "pending", // Set isPending to true if status is pending
      isApproved: false,
      isConfirmed: false,
      returned: false,
      date: date || Date.now(),
    });

    // Save the withdrawal data
    await withdrawData.save();
    // socket.emit("withdrawCreated", withdrawData);
    res.status(201).json({
      message: "order created successfully",
      data: withdrawData,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating order" });
  }
};
exports.createCompleteWithdraw = async (req, res) => {
  console.log(req.body);
  try {
    const {
      customerName,
      customerId,
      goodsId,
      sellerId,
      qty,
      reasonId,
      date,
      sellingPrice,
      isConfirmed,
    } = req.body;

    const goodsData = await goods.findById(goodsId);

    if (!goodsData) {
      return res.status(400).json({ error: "Goods not found" });
    }

    if (goodsData.qty < qty) {
      return res
        .status(400)
        .json({ error: `${goodsData.name} is out of stock` });
    }

    const withdrawData = new withdraw({
      customerName,
      customerId,
      goodsId,
      sellerId,
      qty,
      reasonId,
      sellingPrice,
      isPending: true,
      isApproved: true,
      isConfirmed: isConfirmed,
      returned: false,
      date: date || Date.now(),
    });

    // Save the withdrawal data
    await withdrawData.save();
    goodsData.qty = Number(goodsData.qty) - Number(withdrawData.qty); // Subtract the withdrawn quantity from stock
    await goodsData.save();
    // socket.emit("completeWithdrawCreated", withdrawData);
    res.status(201).json({
      message: "order created successfully",
      data: withdrawData,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating order" });
  }
};

// Approve a withdraw
exports.approveWithdraw = async (req, res) => {
  const { id } = req.params;

  try {
    // const { sellerId } = req.body;

    const withdrawData = await withdraw.findByIdAndUpdate(
      id,
      { isApproved: true, sellerId: req.body.sellerId, qty: req.body.qty } // Update the state and add sellerId
      // { isApproved: true, sellerId }, // Update the state and add sellerId
      // { new: true }
    );

    if (!withdrawData) {
      return res.status(404).json({ message: "order not found" });
    }
    // socket.emit("withdrawApproved", withdrawData);
    res.status(200).json({
      message: "order approved successfully",
      data: withdrawData,
    });
  } catch (error) {
    res.status(500).json({ error: "Error approving order" });
  }
};

// Confirm a withdraw (subtract quantity from inventory when confirmed)
exports.confirmWithdraw = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  // console.log(req.body);
  try {
    const withdrawData = await withdraw.findById(id);
    if (!withdrawData) {
      return res.status(404).json({ message: "order not found" });
    }

    if (withdrawData.isConfirmed) {
      return res.status(400).json({ message: "order already confirmed" });
    }

    // Mark the withdraw as confirmed
    withdrawData.isConfirmed = true;
    withdrawData.customerId = req.body.customerId;
    await withdrawData.save();

    // Update the goods inventory after confirmation
    const goodsData = await goods.findById(withdrawData.goodsId);
    if (!goodsData) {
      return res.status(400).json({ message: "Goods not found" });
    }
    if (goodsData.qty < withdrawData.qty) {
      return res.status(400).json({ message: "goods out of stock" });
    }

    goodsData.qty = Number(goodsData.qty) - Number(withdrawData.qty); // Subtract the withdrawn quantity from stock
    await goodsData.save();
    // socket.emit("withdrawConfirmed", withdrawData);
    res.status(200).json({
      message: "order confirmed successfully",
      data: withdrawData,
    });
  } catch (error) {
    res.status(500).json({ error: "Error confirming order" });
  }
};

// Return goods (increase quantity in inventory for internal use)
exports.returnGoods = async (req, res) => {
  // console.log(req.body);
  try {
    const { withdrawId, returnedQty, returnedBy, reason } = req.body;

    const withdrawData = await withdraw.findById(withdrawId);
    if (!withdrawData) {
      return res.status(404).json({ message: "order not found" });
    }
    if (withdrawData.returned) {
      return res.status(400).json({ message: "order already returned" });
    }
    withdrawData.returned = true;
    await withdrawData.save();
    // Create a new record in ReturnedGoods for tracking
    const returnedGoodsData = new ReturnedGoods({
      withdrawId,
      returnedQty,
      returnedBy,
      reason,
    });

    await returnedGoodsData.save();
    // socket.emit("goodsReturned", withdrawData);
    // Update the goods inventory (increase the qty for returned goods)
    const goodsData = await goods.findById(withdrawData.goodsId);
    if (!goodsData) {
      return res.status(400).json({ message: "Goods not found" });
    }

    goodsData.qty = Number(goodsData.qty) + Number(returnedQty); // Add the returned quantity to the stock
    await goodsData.save();

    res.status(200).json({
      message: "Goods returned successfully and inventory updated",
      data: returnedGoodsData,
    });
  } catch (error) {
    res.status(500).json({ error: "Error returning goods" });
  }
};

// Get all withdraws
exports.getAllWithdraws = async (req, res) => {
  try {
    const withdraws = await withdraw
      .find()
      .populate("customerId", "name email")
      .populate("goodsId", "name price description qty photo")
      .populate("sellerId", "name email")
      .populate("reasonId", "name")
      .exec();
    res.status(200).json({ data: withdraws });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving order" });
  }
};

// Get a single withdraw by ID
exports.getWithdrawById = async (req, res) => {
  try {
    const withdrawData = await withdraw
      .findById(req.params.id)
      .populate("customerId", "name email photo")
      .populate("goodsId", "name price")
      .populate("sellerId", "name email photo")
      .populate("reasonId", "reason")
      .exec();

    if (!withdrawData) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ data: withdrawData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the order" });
  }
};

// Delete a withdraw by ID
exports.deleteWithdraw = async (req, res) => {
  console.log(req.params);
  try {
    const withdrawData = await withdraw.findByIdAndDelete(req.params.id);

    if (!withdrawData) {
      return res.status(404).json({ message: "order not found" });
    }
    const goodsData = await goods.findById(withdrawData.goodsId._id);
    // socket.emit("goodsDeleted", withdrawData);
    if (
      goodsData &&
      withdrawData.isConfirmed &&
      withdrawData.isApproved &&
      withdrawData.isPending &&
      !withdrawData.returned
    ) {
      goodsData.qty = Number(goodsData.qty) + Number(withdrawData.qty); // Add the returned quantity to the stock
      await goodsData.save();
    }
    res.status(200).json({ message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
};
