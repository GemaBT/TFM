console.log("Hola mundo desde Node");

//require("dotenv").config();// Esto hace que dotenv busque automáticamente un archivo .env en:
require("dotenv").config({ path: "C:\\Users\\santi\\Documents\\gema principal\\15.-Master UNIR\\.env" }); // tengo que tomar decisión sobre esto

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/userRoutes");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error(err));

app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Servidor escuchando en puerto 3000");
});
/*
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");

const app = express();

app.use(express.json());

// conectar a Mongo
connectDB();

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
*/
/*
✔ solo un sitio controla la conexión
✔ más fácil cambiar base de datos
✔ código más limpio
✔ reutilizable en scripts (init-db.js, tests, etc.)
*/