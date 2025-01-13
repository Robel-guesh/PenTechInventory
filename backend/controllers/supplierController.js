const SupplierModel = require("../models/supplierModel"); // Import Supplier model

// Create a new Supplier
const createSupplier = async (req, res) => {
  try {
    const { supplierName, invoiceNumber, mobile } = req.body;

    // Create a new Supplier instance
    const newSupplier = new SupplierModel({
      supplierName,
      invoiceNumber,
      mobile,
    });

    await newSupplier.save(); // Save the new supplier to the database
    res.status(201).json(newSupplier); // Respond with the newly created supplier
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Supplier", error: error.message });
  }
};

// Get all Suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find(); // Fetch all Suppliers from the database
    res.status(200).json(suppliers); // Return the list of Suppliers
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Suppliers", error: error.message });
  }
};

// Get a Supplier by ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id); // Find a specific Supplier by ID

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier); // Return the found Supplier
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Supplier", error: error.message });
  }
};

// Update a Supplier by ID
const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await SupplierModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated Supplier
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(updatedSupplier); // Respond with the updated Supplier
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Supplier", error: error.message });
  }
};

// Delete a Supplier by ID
const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await SupplierModel.findByIdAndDelete(
      req.params.id
    ); // Delete the Supplier by ID

    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Supplier", error: error.message });
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
