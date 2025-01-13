const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
  },
  invoiceNumber: {
    type: String,
  },
  mobile: {
    type: String,
  },
});

const SupplierModel = mongoose.model("SupplierModel", supplierSchema);

module.exports = SupplierModel;
