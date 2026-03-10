require("dotenv").config({ path: "C:\\Users\\santi\\Documents\\gema principal\\15.-Master UNIR\\.env" }); // tengo que tomar decisión sobre esto
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//const hashedPassword = await bcrypt.hash("admin123", 10); //cambiar a .env

//mongoose → biblioteca que permite conectar y trabajar con MongoDB desde Node.js usando modelos y esquemas.
//dotenv → permite usar variables de entorno (por ejemplo, la URL de Mongo) para no hardcodear datos sensibles.

// Importar modelos
const Role = require("../data-model/Role");
const User = require("../data-model/User");
const AuditLog = require("../data-model/AuditLog"); 

async function initDB() {
  try {
    //await mongoose.connect("mongodb://localhost:27017/tfmDB");
    await mongoose.connect(process.env.MONGO_URI);
        
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const rolesCount = await Role.countDocuments();

    if (rolesCount === 0) {
      const adminRole = await Role.create({
        name: "admin",
        required: true,
        unique: true,
        permissions: ["create_user","delete_user","read_users","update_users","manage_roles"]
      });

      const userRole = await Role.create({
        name: "user",
        required: true,
        unique: true,
        permissions: ["read_profile"]
      });

      console.log("Roles creados");

      const adminUser = await User.create({
        username: "admin",
        email: "admin@tfm.com",
        passwordHash: hashedPassword, // con bcrypt 
        roleId: adminRole._id,
        isActive: true,
        // createdAt y lastLogin se llenan automáticamente
      });
    
      console.log("Usuario admin creado");
    
      await AuditLog.create({
        userId: adminUser._id,
        action: "CREATED_USER",
        ip: "127.0.0.1",
        timestamp: new Date()
      });

      console.log("Log de auditoría creado para admin");
    
    } else {
    
      console.log("La base de datos ya estaba inicializada");
    
    }

    process.exit(0);

  } catch (error) {
    console.error("Error inicializando DB:", error);
    process.exit(1);
  }
}

initDB();

/*Crea e inicializa la base de datos con los esquemas creados de Rol, Usuario y log
Crea usuario Administrador
y crea roles de administrador y usuario
Añade log de usuario administrador creado
Total 3 collecciones
Usuarios
Roles 
y log donde se almacena el primer log del usuario creado

Se utiliza .env  fuera del proyecto para los datos de naturaleza sensible*/

// Tenemos que hacer esto mismo en session cuando queramos establecer la sessión de usuario
//meter los logs y crear en la colleción sessión el documento activo de sessión del usuario
// recordar que hay que eliminar de la base de datos la sessión cuando el tiempo del token expire.