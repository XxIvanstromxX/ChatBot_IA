const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const { GEMINI_API_KEY } = process.env;
const { chatHistory } = require("../schemas/conversacion");
const { buildCannedResponse } = require("../utils/filterquestions");
const { getProducts } = require("../utils/obtenerProductos");

const ai = new GoogleGenAI({ GEMINI_API_KEY });

const chatIA = async (req, res) => {
  const { question, user_id } = req.body;
  if (!question || !user_id || user_id === "anonymous" || user_id > 0) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const canned = buildCannedResponse(question);
    if (canned) {
      const newChat = new chatHistory({
        user_id,
        userAsk: question,
        botAnswer: canned,
      });
      await newChat.save();
      return res.status(200).json({
        respuesta: canned,
      });
    }

    const history = await chatHistory
      .find({ user_id })
      .sort({ createdAt: -1 })
      .limit(5);

    const orderedHistory = history.reverse();

    let conversationHistory = orderedHistory.flatMap((item) => {
      const messages = [];

      if (item.userAsk) {
        messages.push({ role: "user", parts: [{ text: item.userAsk }] });
      }

      if (item.botAnswer) {
        messages.push({ role: "model", parts: [{ text: item.botAnswer }] });
      }

      return messages;
    });

    let productos = await getProducts();
    if (!productos) {
      console.log(productos);
      productos = [];
    }
    console.log(productos);

    const chatGemini = ai.chats.create({
      model: "gemini-2.5-flash",
      history: conversationHistory,
      config: {
        systemInstruction: `Eres Jean, un asesor de ropa deportiva especializado en moda y deportes. 

INVENTARIO ACTUAL DE LA TIENDA:
${JSON.stringify(productos, null, 2)}

INSTRUCCIONES IMPORTANTES:
- Solo recomienda productos del inventario anterior
- Cuando te pidan recomendaciones, busca productos específicos de la lista
- Menciona nombre exacto, precio y características del producto
- Si no hay productos relacionados, conversa normalmente como asesor
- Tus respuestas máximo 2 párrafos
- Sé conciso pero amigable

FORMATO de recomendación:
"Te recomiendo [nombre del producto] por $[precio] porque [razón específica]"`,
      },
    });

    const respGemini = await chatGemini.sendMessage({ message: question });

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
