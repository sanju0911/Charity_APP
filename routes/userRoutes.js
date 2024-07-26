// routes/userRouter.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const donationController = require("../controllers/donationController");

const payment = require("../controllers/payment");
const { verifytoken } = require("../auth/auth");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/volunteer", donationController.volt);

router.post("/contact", donationController.contact);

router.post("/donate", payment.createOrder);

router.post("/donatelist", donationController.donatelist);

router.get("/donateCount", donationController.donationCounter);

http: router.get("/loginCount", verifytoken, userController.countedlogin);

module.exports = router;
