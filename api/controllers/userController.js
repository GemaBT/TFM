const userService = require("../services/userService");

async function getUsers(req, res) {
  const users = await userService.getAllUsers();
  res.json(users);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(user);
}

async function createUser(req, res) {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
}

async function updateUser(req, res) {
  const id = req.params.id;      // id del usuario
  const data = req.body;         // datos a actualizar

  const updatedUser = await userService.updateUser(id, data);
  res.json(updatedUser);
}
async function deleteUser(req, res) {
  const id = req.params.id;

  const deletedUser = await userService.deleteUser(id);

  res.json({
    message: "Usuario eliminado correctamente",
    user: deletedUser
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

