// Import necessary modules
const mongoose = require("mongoose");

// Define the schema for the Donation object
const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    // Add other fields as needed
  },
  { timestamps: true }
); // This will add createdAt and updatedAt fields automatically

// Create a model for the Donation object using the schema
const Donation = mongoose.model("Donation", donationSchema);

// Export the Donation model to be used in other parts of the application
module.exports = Donation;
