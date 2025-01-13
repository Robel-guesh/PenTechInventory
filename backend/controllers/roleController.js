const RoleModel = require("../models/roleModel"); // Import Role model

// Create a new Role
const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Create a new Role instance
    const newRole = new RoleModel({
      name,
    });

    await newRole.save(); // Save the new role to the database
    res.status(201).json(newRole); // Respond with the newly created role
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Role", error: error.message });
  }
};

// Get all Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find(); // Fetch all Roles from the database
    res.status(200).json(roles); // Return the list of Roles
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Roles", error: error.message });
  }
};

// Get a Role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await RoleModel.findById(req.params.id); // Find a specific Role by ID

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(role); // Return the found Role
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Role", error: error.message });
  }
};

// Update a Role by ID
const updateRole = async (req, res) => {
  try {
    const updatedRole = await RoleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated Role
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(updatedRole); // Respond with the updated Role
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Role", error: error.message });
  }
};

// Delete a Role by ID
const deleteRole = async (req, res) => {
  try {
    const deletedRole = await RoleModel.findByIdAndDelete(req.params.id); // Delete the Role by ID

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" }); // Respond with success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Role", error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
