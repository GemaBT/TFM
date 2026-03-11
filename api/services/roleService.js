// esta capa habla directamente con MongoDB

const Role = require("../../data-model/Role");

async function getAllRoles() {
  return await Role.find();
}

async function getRoleById(id) {
  return await Role.findById(id);
}

async function createRole(data) {
  return await Role.create(data);
}

async function updateRole(id, data) {
  return await Role.findByIdAndUpdate(id, data, { new: true });
}

async function deleteRole(id) {
  return await Role.findByIdAndDelete(id);
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};