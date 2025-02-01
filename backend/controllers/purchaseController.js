const purchase = require("../models/purchase");
const goods = require("../models/goods");

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    // Create the new purchase entry first
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

    // Save the new purchase data
    await purchaseData.save();

    // Update all purchase records with the same id
    const updatedPurchases = await purchase.updateMany(
      { id: req.body.id }, // Find all purchases with the same id
      { $set: { sellingPrice: req.body.sellingPrice } } // Set the new selling price
    );

    // Check if any purchase records were updated
    if (updatedPurchases.nModified > 0) {
      console.log(
        `${updatedPurchases.nModified} purchases updated with new selling price.`
      );
    }

    // Update the quantity in the goods model (increase the quantity of the purchased goods)
    const goodsData = await goods.findById(req.body.id); // Find the goods by the ID of the purchased item
    if (!goodsData) {
      return res.status(404).json({ message: "Goods not found" });
    }

    // Increase the goods stock by the purchased quantity
    goodsData.qty = Number(goodsData.qty) + Number(req.body.qty);
    await goodsData.save(); // Save the updated goods quantity

    res.status(201).json({
      message: "Purchase created and selling price updated for all purchases",
      data: purchaseData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error while creating or updating purchase" });
  }
};

// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchase
      .find()
      .populate("id", "name photo description category")
      .populate("storeLocationId", "name location") // Populating store model's name and location fields
      .populate("userId", "name email") // Changed from userID to userId
      .populate("supplierId", "name invoiceNumber mobile") // Populating supplier model's fields
      .populate("goodsStatusId", "name") // Populating status model's name field
      .populate("typeId", "name") // Changed from typeID to typeId
      .exec();

    res.status(200).json({ data: purchases });
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

    res.status(200).json({ data: purchaseData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the purchase" });
  }
};

// Update a purchase by ID
exports.updatePurchase = async (req, res) => {
  try {
    // Find the original purchase data
    const originalPurchase = await purchase.findById(req.params.id);
    if (!originalPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Find the goods by ID of the purchased item
    const goodsData = await goods.findById(originalPurchase.id);
    if (!goodsData) {
      return res.status(404).json({ message: "Goods not found" });
    }
    // console.log(originalPurchase);
    // Revert the previous purchase quantity (decrease stock by original quantity)
    goodsData.qty = Number(goodsData.qty) - Number(originalPurchase.qty);
    await goodsData.save();

    // Apply the new purchase quantity (increase stock by new quantity)
    goodsData.qty = Number(goodsData.qty) + Number(req.body.qty);
    await goodsData.save();

    // Update the purchase data with the new details
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
    const updatedPurchases = await purchase.updateMany(
      { id: originalPurchase.id }, // Find all purchases with the same id
      { $set: { sellingPrice: req.body.sellingPrice } } // Set the new selling price
    );

    // Check if any purchase records were updated
    if (updatedPurchases.nModified > 0) {
      console.log(
        `${updatedPurchases.nModified} purchases updated with new selling price.`
      );
    }
    res.status(200).json({
      message: "Purchase updated successfully",
      data: purchaseData,
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

    // Find the goods by the ID of the purchased item
    const goodsData = await goods.findById(purchaseData.id);
    if (!goodsData) {
      return res.status(404).json({ message: "Goods not found" });
    }

    // Decrease the goods stock by the purchased quantity
    goodsData.qty = Number(goodsData.qty) - Number(purchaseData.qty);
    await goodsData.save(); // Save the updated goods quantity

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting purchase" });
  }
};
