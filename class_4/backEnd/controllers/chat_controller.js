const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const { GEMINI_API_KEY } = process.env;
const { chatHistory } = require("../schemas/conversacion");
const { buildCannedResponse } = require("../utils/filterquestions");

const ai = new GoogleGenAI({ GEMINI_API_KEY });

const chatIA = async (req, res) => {
  const { question, user_id } = req.body;
  if (!question || !user_id) {
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

    const chatGemini = ai.chats.create({
      model: "gemini-2.5-flash",
      history: conversationHistory,
      config: {
        systemInstruction:
          "Eres un asesor de ropa deportiva especializado en moda y deportes, ayudando a los usuarios a elegir la mejor ropa y accesorios para sus actividades deportivas. Y tú nombre es: Jean, tus mensajes no deben exeder más de 2 parrafos, se concreto con tus mensajes pero tampoco seas cortante, tienes que ser breve en tus mensajes, no extiendas mucho tu conversación",
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
