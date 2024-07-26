// Import necessary modules
const mongoose = require("mongoose");

// Define the schema for the Donation object
const donationCountSchema = new mongoose.Schema({
  NUmbers: {
    type: Number,
    required: true,
    default: 5,
  },

  // Add other fields as needed
}); // This will add createdAt and updatedAt fields automatically

// Create a model for the Donation object using the schema
const DonationCount = mongoose.model("DonationCount", donationCountSchema);

// Export the Donation model to be used in other parts of the application
module.exports = DonationCount;
