const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const { GEMINI_API_KEY } = process.env;
const { chatHistory } = require("../schemas/conversacion");

const ai = new GoogleGenAI({ GEMINI_API_KEY });

const chatIA = async (req, res) => {
  const { question, user_id } = req.body;
  if (!question || !user_id) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const respGemini = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });
    if (!respGemini) {
      return res
        .status(409)
        .json({ message: "El asistente no genero ninguna respuesta" });
    }

    const newChat = new chatHistory({
      user_id,
      userAsk: question,
      botAnswer: respGemini.text,
    });

    await newChat.save();

    return res.status(200).json({
      respuesta: respGemini.text,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { chatIA };
