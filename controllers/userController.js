const bcrypt = require("bcrypt");
const customer = require("../model/user");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const LoginCount = require("../model/count");

// Assuming you have a 'customer' model

exports.signup = async (req, res) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await customer.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new customer({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Generate a token

    // Save the new user to the database
    await newUser.save();

    const countlogin = new LoginCount({
      email: req.body.email,
      loggedCount: 1,
    });

    await countlogin.save();

    // Send a success response
    res.status(200).json({ USER: newUser, logintimer: countlogin.loggedCount }); // Modified response
  } catch (error) {
    // Handle any errors
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const loggeduser = await customer.findOne({ email: req.body.email });

    if (loggeduser) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        loggeduser.password
      );

      if (isMatch) {
        const token = JWT.sign(
          { email: req.body.email, password: req.body.password },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        // Find or create login count document
        let loginCount = await LoginCount.findOne({ email: req.body.email });

        // Update login count
        loginCount.loggedCount++;
        await loginCount.save();

        return res.status(200).json({
          message: "logged in successfully",
          loggeduser,
          token: token,
          logintimer: loginCount.loggedCount,
        });
      }
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.countedlogin = async (req, res) => {
  try {
    const gotEmail = req.body.email;
    const count = await LoginCount.find({ email: gotEmail });
    console.log(count);

    if (count) {
      return res.status(200).json({ count });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(count);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
