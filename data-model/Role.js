// api/models/Role.js
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }]
});

// ✅ Exporta el modelo de Mongoose
module.exports = mongoose.model("Role", RoleSchema);