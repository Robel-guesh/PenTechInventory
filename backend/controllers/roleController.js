const role = require("../models/role");

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const roleData = new role({
      name: req.body.name,
    });

    await roleData.save();
    res
      .status(201)
      .json({ message: "Role created successfully", data: roleData });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating role" });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await role.find();
    res.status(200).json({ data: roles });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving roles" });
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const roleData = await role.findById(req.params.id);

    if (!roleData) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ data: roleData });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the role" });
  }
};

// Update a role by ID
exports.updateRole = async (req, res) => {
  try {
    const roleData = await role.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!roleData) {
      return res.status(404).json({ message: "Role not found" });
    }

    res
      .status(200)
      .json({ message: "Role updated successfully", data: roleData });
  } catch (error) {
    res.status(500).json({ error: "Error updating role" });
  }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
  try {
    const roleData = await role.findByIdAndDelete(req.params.id);

    if (!roleData) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting role" });
  }
};
