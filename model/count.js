const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  loggedCount: {
    type: Number,
    required: true,
    default: 1,
  },
});

const countLogin = mongoose.model("countLogin", loginSchema);

module.exports = countLogin;
