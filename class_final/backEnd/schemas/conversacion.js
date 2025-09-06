const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatHistorySchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  userAsk: {
    type: String,
    required: true,
  },
  botAnswer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatHistory = mongoose.model("ChatHistory", chatHistorySchema);

module.exports = { chatHistory };

//Tipo de dato Primitivo
//Cadenas de texto => String
//Para numeros => Number = int = float = double
//Booleanos => verdadero y falso = True & False = 1 & 0 // null, undefined o 0 son valores falsos

// Tipo de datos complejos o compuestos
//Array => ["232", "asdasd", true, false]
//Objects => {Nombre: "Ivan"}
//Date
