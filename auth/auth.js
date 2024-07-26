const JWT = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const verifytoken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "you are not authorized" });
  }
};

module.exports = {
  verifytoken,
};
