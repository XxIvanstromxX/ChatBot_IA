const express = require("express");
const { connectDB } = require("./config/db");
require("dotenv").config();
const { chatIA } = require("./controllers/chat_controller");
const { PORT } = process.env;
const cors = require("cors");

const app = express(); // Crear instancia para express
connectDB(); //Llamamos a la funcion de connectDB para que funcione la base de datos

app.use(
  cors({
    origin: "http://127.0.0.1:59902",
  })
);
app.use(express.json()); // Middleware para leer el cuerpo de las peticiones en json

app.post("/ask", chatIA);

app.listen(PORT, () => {
  console.log(`El servidor se esta escuchando en http://localhost:${PORT}`);
});
