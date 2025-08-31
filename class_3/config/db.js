const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "Chatbot",
    });
    console.log("MongoDB se conecto correctamente 🚀");
  } catch (err) {
    console.log("Hubo un error en la conexión con MongoDB", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
