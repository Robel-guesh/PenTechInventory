const purchase = require("../models/purchase");

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    const purchaseData = new purchase({
      id: req.body.id,
      qty: req.body.qty,
      unitPrice: req.body.unitPrice,
      sellingPrice: req.body.sellingPrice,
      storeLocationId: req.body.storeLocationId,
      userId: req.body.userId, // Changed from userID to userId
      supplierId: req.body.supplierId,
      goodsStatusId: req.body.goodsStatusId,
      typeId: req.body.typeId, // Changed from typeID to typeId
    });

    await purchaseData.save();
    res
      .status(201)
      .json({
        message: "Purchase created successfully",
        purchase: purchaseData,
      });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating purchase" });
  }
};

// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchase
      .find()
      .populate("id", "name") // Populating goods model's name field
      .populate("storeLocationId", "name location") // Populating store model's name and location fields
      .populate("userId", "name email") // Changed from userID to userId
      .populate("supplierId", "name invoiceNumber mobile") // Populating supplier model's fields
      .populate("goodsStatusId", "name") // Populating status model's name field
      .populate("typeId", "name") // Changed from typeID to typeId
      .exec();

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving purchases" });
  }
};

// Get a single purchase by ID
exports.getPurchaseById = async (req, res) => {
  try {
    const purchaseData = await purchase
      .findById(req.params.id)
      .populate("id", "name")
      .populate("storeLocationId", "name location")
      .populate("userId", "name email") // Changed from userID to userId
      .populate("supplierId", "name invoiceNumber mobile")
      .populate("goodsStatusId", "name")
      .populate("typeId", "name") // Changed from typeID to typeId
      .exec();

    if (!purchaseData) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json(purchaseData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the purchase" });
  }
};

// Update a purchase by ID
exports.updatePurchase = async (req, res) => {
  try {
    const purchaseData = await purchase.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        qty: req.body.qty,
        unitPrice: req.body.unitPrice,
        sellingPrice: req.body.sellingPrice,
        storeLocationId: req.body.storeLocationId,
        userId: req.body.userId, // Changed from userID to userId
        supplierId: req.body.supplierId,
        goodsStatusId: req.body.goodsStatusId,
        typeId: req.body.typeId, // Changed from typeID to typeId
      },
      { new: true }
    );

    if (!purchaseData) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res
      .status(200)
      .json({
        message: "Purchase updated successfully",
        purchase: purchaseData,
      });
  } catch (error) {
    res.status(500).json({ error: "Error updating purchase" });
  }
};

// Delete a purchase by ID
exports.deletePurchase = async (req, res) => {
  try {
    const purchaseData = await purchase.findByIdAndDelete(req.params.id);

    if (!purchaseData) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting purchase" });
  }
};
