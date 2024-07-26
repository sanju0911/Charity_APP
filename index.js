const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const database = require("./config/db");
const cors = require("cors");

const app = express();

// JWT

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Serve static files
app.use(express.static(path.join(__dirname, "views")));

// Database connection
database();

// Routes
app.use("/api/users", userRouter);

// Serve the entering page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
// Redirect to signup page

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
