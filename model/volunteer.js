const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  // CV: {
  //   type: File, // Change the type as per your requirement (e.g., File)
  //   required: true,
  // },
  message: {
    type: String,
    required: true,
  },
});

const volunteer_User = mongoose.model("volunteer_User", volunteerSchema);

module.exports = volunteer_User;
