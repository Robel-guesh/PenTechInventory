const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

// Route for creating a new supplier
router.post("/", supplierController.createSupplier);

// Route for getting all suppliers
router.get("/", supplierController.getAllSuppliers);

// Route for getting a single supplier by ID
router.get("/:id", supplierController.getSupplierById);

// Route for updating a supplier by ID
router.put("/:id", supplierController.updateSupplier);

// Route for deleting a supplier by ID
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
