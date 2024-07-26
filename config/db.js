const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.url);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("error");
  }
};

module.exports = connectDB;
