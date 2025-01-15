const goods = require("../models/goods");

// Create a new good
exports.createGood = async (req, res) => {
  const photo = req.files ? req.files.map((file) => file.path) : [];
  console.log(req.body);
  const {
    id,
    name,
    catagoryId,
    unitOfMeasureId,
    qty,
    description,
    shortageLevel,
  } = req.body;

  try {
    // Check if a good with the same id or name already exists
    const existingGood = await goods.findOne({
      $or: [{ id }, { name }],
    });

    if (existingGood) {
      // If the good already exists, return an error message
      return res.status(400).json({
        message:
          "Good with the same ID or name already registered insert another data",
      });
    }

    // If no existing good, proceed to create a new good
    const goodData = new goods({
      id,
      name,
      catagoryId,
      unitOfMeasureId,
      qty,
      photo,
      description,
      shortageLevel,
    });

    await goodData.save();
    res.status(201).json({
      message: "Good created successfully",
      data: goodData,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      error: "Server error while creating good",
    });
  }
};

// Get all goods
exports.getAllGoods = async (req, res) => {
  try {
    const goodsList = await goods
      .find()
      .populate("catagoryId", "name") // Populating category model's name field
      .populate("unitOfMeasureId", "groupName name qty") // Populating measurement model's fields
      .exec();
    res.status(200).json({ data: goodsList });
    // res.send("helo");
  } catch (error) {
    res.status(500).json({ error: "Error retrieving goods" });
  }
};

// Get a single good by ID
exports.getGoodById = async (req, res) => {
  try {
    const goodData = await goods
      .findById(req.params.id)
      .populate("catagoryId", "name")
      .populate("unitOfMeasureId", "groupName name qty")
      .exec();

    if (!goodData) {
      return res.status(404).json({ message: "Good not found" });
    }

    res.status(200).json({ data: goodData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the good" });
  }
};

// Update a good by ID
exports.updateGood = async (req, res) => {
  const photo = req.files ? req.files.map((file) => file.path) : [];
  try {
    const goodData = await goods.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        name: req.body.name,
        catagoryId: req.body.catagoryId,
        unitOfMeasureId: req.body.unitOfMeasureId,
        qty: req.body.qty,
        photo: photo,
        description: req.body.description,
        shortageLevel: req.body.shortageLevel,
      },
      { new: true }
    );

    if (!goodData) {
      return res.status(404).json({ message: "Good not found" });
    }

    res
      .status(200)
      .json({ message: "Good updated successfully", data: goodData });
  } catch (error) {
    res.status(500).json({ error: "Error updating good" });
  }
};

// Delete a good by ID
exports.deleteGood = async (req, res) => {
  try {
    const goodData = await goods.findByIdAndDelete(req.params.id);

    if (!goodData) {
      return res.status(404).json({ message: "Good not found" });
    }

    res.status(200).json({ message: "Good deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting good" });
  }
};
