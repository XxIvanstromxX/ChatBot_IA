const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ API_KEY });

const modeloAI = async () => {
  try {
    const respuesta = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Qué es la ia, resumelo en 1 parrafo",
    });

    console.log(respuesta.text);
  } catch (err) {
    console.log(err);
  }
};

modeloAI();
