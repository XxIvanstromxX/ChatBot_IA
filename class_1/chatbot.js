const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

//Ruta para hacer preguntas a la IA
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: "Falta la 'question'." });
  }

  console.log(question);

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  try {
    const geminiResp = await axios.post(URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return res.status(200).json(geminiResp.data);
  } catch (error) {
    res.status(500).json({ message: "Error en la conexión con Gemini" });
  }
});

app.listen(3000, () => {
  console.log("Servidor listo en http://localhost:3000");
});
