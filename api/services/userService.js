// esta capa habla directamente con MongoDB a través del modelo y mongoose

/*const User = require("../../data-model/User");

async function getAllUsers() {
  return await User.find();
}

async function getUserById(id) {
  return await User.findById(id);
}

async function createUser(data) {
  return await User.create(data);
}

async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};*/
// services/userService.js

const User = require("../../data-model/User");
const bcrypt = require("bcrypt");

async function createUser(data) {
  // Hash de la contraseña
  if (data.password) {
    data.passwordHash = await bcrypt.hash(data.password, 10);
    delete data.password; // eliminamos la clave 'password' para no guardarla
  }

  return await User.create(data);
}

async function getAllUsers() {
  return await User.find();
}

async function getUserById(id) {
  return await User.findById(id);
}

async function updateUser(id, data) {
  // si hay password en update, también la hasheamos
  if (data.password) {
    data.passwordHash = await bcrypt.hash(data.password, 10);
    delete data.password;
  }

  return await User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};