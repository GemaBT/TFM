
require("dotenv").config({ path: "C:\\Users\\santi\\Documents\\gema principal\\15.-Master UNIR\\.env" }); // tengo que tomar decisión sobre esto

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Session = require("../data-model/Session");
const User = require("../data-model/User");
const AuditLog = require("../data-model/AuditLog"); 

async function initSessions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado");

    const adminUser = await User.findOne({ username: "admin" });
    if (!adminUser) {
      console.log("❌ No se encontró usuario admin. Ejecuta init-db.js primero");
      process.exit(1);
    }

    const existingSession = await Session.findOne({ userId: adminUser._id });
    /*if (existingSession) {
      console.log("Sesión ya inicializada para admin");
    } else {
      const exampleToken = bcrypt.hashSync("token_de_prueba", 10);

      const newSession = await Session.create({
        userId: adminUser._id,
        token: exampleToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // expira en 24h
      });*/

      console.log("✅ Sesión inicializada para admin");

      // Crear un log de auditoría
     /* await AuditLog.create({
        userId: adminUser._id,
        action: "CREATED_SESSION",
        ip: "127.0.0.1", // o obtener IP si aplica
        timestamp: new Date()
      });

      console.log("📜 Log de auditoría registrado");*/
    //}

    process.exit(0);
  } catch (error) {
    console.error("❌ Error inicializando sesiones:", error);
    process.exit(1);
  }
}

initSessions();

// Tenemos que hacer esto mismo en session cuando queramos establecer la sessión de usuario
//meter los logs y crear en la colleción sessión el documento activo de sessión del usuario
// recordar que hay que eliminar de la base de datos la sessión cuando el tiempo del token expire.