const withdraw = require("../models/withdraw");

// Create a new withdraw
exports.createWithdraw = async (req, res) => {
  try {
    const withdrawData = new withdraw({
      customerName: req.body.customerName,
      customerId: req.body.customerId,
      goodsId: req.body.goodsId,
      sellerId: req.body.sellerId,
      qty: req.body.qty,
      reasonId: req.body.reasonId,
      status: req.body.status,
      date: req.body.date,
    });

    await withdrawData.save();
    res
      .status(201)
      .json({
        message: "Withdraw created successfully",
        withdraw: withdrawData,
      });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating withdraw" });
  }
};

// Get all withdraws
exports.getAllWithdraws = async (req, res) => {
  try {
    const withdraws = await withdraw
      .find()
      .populate("customerId", "name email") // Assuming 'user' has 'name' and 'email'
      .populate("goodsId", "name price") // Assuming 'goods' has 'name' and 'price'
      .populate("sellerId", "name email") // Assuming 'user' has 'name' and 'email'
      .populate("reasonId", "reason") // Assuming 'reason' has 'reason' field
      .exec();
    res.status(200).json(withdraws);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving withdraws" });
  }
};

// Get a single withdraw by ID
exports.getWithdrawById = async (req, res) => {
  try {
    const withdrawData = await withdraw
      .findById(req.params.id)
      .populate("customerId", "name email")
      .populate("goodsId", "name price")
      .populate("sellerId", "name email")
      .populate("reasonId", "reason")
      .exec();

    if (!withdrawData) {
      return res.status(404).json({ message: "Withdraw not found" });
    }
    res.status(200).json(withdrawData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the withdraw" });
  }
};

// Update a withdraw by ID
exports.updateWithdraw = async (req, res) => {
  try {
    const withdrawData = await withdraw.findByIdAndUpdate(
      req.params.id,
      {
        customerName: req.body.customerName,
        customerId: req.body.customerId,
        goodsId: req.body.goodsId,
        sellerId: req.body.sellerId,
        qty: req.body.qty,
        reasonId: req.body.reasonId,
        status: req.body.status,
        date: req.body.date,
      },
      { new: true }
    );

    if (!withdrawData) {
      return res.status(404).json({ message: "Withdraw not found" });
    }

    res
      .status(200)
      .json({
        message: "Withdraw updated successfully",
        withdraw: withdrawData,
      });
  } catch (error) {
    res.status(500).json({ error: "Error updating withdraw" });
  }
};

// Delete a withdraw by ID
exports.deleteWithdraw = async (req, res) => {
  try {
    const withdrawData = await withdraw.findByIdAndDelete(req.params.id);

    if (!withdrawData) {
      return res.status(404).json({ message: "Withdraw not found" });
    }

    res.status(200).json({ message: "Withdraw deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting withdraw" });
  }
};
