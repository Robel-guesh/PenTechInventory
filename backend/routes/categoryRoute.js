const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCatagories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Route for creating a new status
router.post("/", createCategory);

// Route for getting all statuses
router.get("/", getAllCatagories);

// Route for getting a single status by ID
router.get("/:id", getCategoryById);

// Route for updating a status by ID
router.put("/:id", updateCategory);

// Route for deleting a status by ID
router.delete("/:id", deleteCategory);

module.exports = router;
