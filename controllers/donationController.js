const Volunteer = require("../model/volunteer");
const Contact = require("../model/contact");
const Donation = require("../model/donatelist");
const donationCount = require("../model/DonationCount");

exports.volt = async (req, res) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await Volunteer.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new Volunteer({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(200).json({
      message:
        "Your request has been submitted successfully. We will reach you shortly.",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.contact = async (req, res) => {
  try {
    // Create a new contact message
    const newMessage = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      message: req.body.message,
    });

    // Save the message to the database
    await newMessage.save();

    // Send a success response
    res.status(200).json({
      message:
        "Your message has been sent successfully. We will get back to you shortly.",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.donatelist = async (req, res) => {
  try {
    // Create a new donation entry
    const newDonation = new Donation({
      amount: req.body.amount,
      orderId: req.body.id,
      // Add other details as needed
    });

    // Save the donation to the database
    let x = await newDonation.save();
    if (x) {
      await donationCount.updateOne(
        {},
        { $inc: { NUmbers: 1 } },
        { upsert: true }
      );
    }
    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Donation details stored successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.donationCounter = async (req, res) => {
  try {
    const count = await donationCount.countDocuments({});
    res.status(200).json({ count: count });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
