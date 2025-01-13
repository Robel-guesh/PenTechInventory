const WithdrawModel = require("../models/withdrawModel"); // Import Withdraw model

// Create a new Withdraw record
const createWithdraw = async (req, res) => {
  try {
    const { customerName, nameOfGoods, amount, reason, sellerName } = req.body;

    // Create a new Withdraw instance
    const newWithdraw = new WithdrawModel({
      customerName,
      nameOfGoods,
      amount,
      reason,
      sellerName,
    });

    // Save the new withdraw to the database
    await newWithdraw.save();
    res.status(201).json({
      message: "Withdraw created successfully",
      withdraw: newWithdraw,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Withdraw", error: error.message });
  }
};

// Get all Withdraw records
const getAllWithdraws = async (req, res) => {
  try {
    const withdraws = await WithdrawModel.find(); // Fetch all Withdraw records from the database
    res.status(200).json(withdraws); // Return the list of Withdraw records
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Withdraws", error: error.message });
  }
};

// Get Withdraw record by ID
const getWithdrawById = async (req, res) => {
  try {
    const withdraw = await WithdrawModel.findById(req.params.id); // Find a specific Withdraw by ID

    if (!withdraw) {
      return res.status(404).json({ message: "Withdraw record not found" });
    }

    res.status(200).json(withdraw); // Return the found Withdraw record
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Withdraw record",
      error: error.message,
    });
  }
};

// Update Withdraw record by ID
const updateWithdraw = async (req, res) => {
  try {
    const updatedWithdraw = await WithdrawModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated Withdraw record
    );

    if (!updatedWithdraw) {
      return res.status(404).json({ message: "Withdraw record not found" });
    }

    res.status(200).json(updatedWithdraw); // Respond with the updated Withdraw record
  } catch (error) {
    res.status(500).json({
      message: "Error updating Withdraw record",
      error: error.message,
    });
  }
};

// Delete Withdraw record by ID
const deleteWithdraw = async (req, res) => {
  try {
    const deletedWithdraw = await WithdrawModel.findByIdAndDelete(
      req.params.id
    ); // Delete the Withdraw by ID

    if (!deletedWithdraw) {
      return res.status(404).json({ message: "Withdraw record not found" });
    }

    res.status(200).json({ message: "Withdraw record deleted successfully" }); // Respond with success message
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Withdraw record",
      error: error.message,
    });
  }
};

// Update the status of a Withdraw record (e.g., approve, reject)
const updateWithdrawStatus = async (req, res) => {
  const { status, returned } = req.body;

  try {
    const updatedWithdraw = await WithdrawModel.findByIdAndUpdate(
      req.params.id,
      { status, returned },
      { new: true } // Return the updated Withdraw record
    );

    if (!updatedWithdraw) {
      return res.status(404).json({ message: "Withdraw record not found" });
    }

    res.status(200).json(updatedWithdraw); // Respond with the updated Withdraw record
  } catch (error) {
    res.status(500).json({
      message: "Error updating Withdraw status",
      error: error.message,
    });
  }
};

module.exports = {
  createWithdraw,
  getAllWithdraws,
  getWithdrawById,
  updateWithdraw,
  deleteWithdraw,
  updateWithdrawStatus,
};
