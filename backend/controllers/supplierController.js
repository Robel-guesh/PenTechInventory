const supplier = require("../models/supplier");

// Create a new supplier
exports.createSupplier = async (req, res) => {
  try {
    const supplierData = new supplier({
      name: req.body.name,
      invoiceNumber: req.body.invoiceNumber,
      mobile: req.body.mobile,
    });

    await supplierData.save();
    res
      .status(201)
      .json({
        message: "Supplier created successfully",
        supplier: supplierData,
      });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating supplier" });
  }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving suppliers" });
  }
};

// Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplierData = await supplier.findById(req.params.id);

    if (!supplierData) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplierData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the supplier" });
  }
};

// Update a supplier by ID
exports.updateSupplier = async (req, res) => {
  try {
    const supplierData = await supplier.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        invoiceNumber: req.body.invoiceNumber,
        mobile: req.body.mobile,
      },
      { new: true }
    );

    if (!supplierData) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res
      .status(200)
      .json({
        message: "Supplier updated successfully",
        supplier: supplierData,
      });
  } catch (error) {
    res.status(500).json({ error: "Error updating supplier" });
  }
};

// Delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
  try {
    const supplierData = await supplier.findByIdAndDelete(req.params.id);

    if (!supplierData) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting supplier" });
  }
};
