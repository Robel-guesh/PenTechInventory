const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

// Routes for Supplier CRUD operations
router.post("/suppliers", supplierController.createSupplier); // Create a Supplier
router.get("/suppliers", supplierController.getAllSuppliers); // Get all Suppliers
router.get("/suppliers/:id", supplierController.getSupplierById); // Get a Supplier by ID
router.put("/suppliers/:id", supplierController.updateSupplier); // Update a Supplier by ID
router.delete("/suppliers/:id", supplierController.deleteSupplier); // Delete a Supplier by ID

module.exports = router;
