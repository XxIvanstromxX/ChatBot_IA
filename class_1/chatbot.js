const express = require("express");
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(express.json());

const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res
      .status(400)
      .json({ message: "Falta la 'question' dentro del body" });
  }

  try {
    const payload = { contents: [{ parts: [{ text: question }] }] };
    const respGemini = await axios.post(URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return res.status(200).json({
      MODEL: "gemini-2.0-flash",
      RESP: respGemini?.data?.candidates[0]?.content?.parts[0]?.text,
      TIME: new Date().toISOString(),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Interal Error" });
  }
});

app.listen(3000, () => {
  console.log("server listen on http://localhost:3000");
});
