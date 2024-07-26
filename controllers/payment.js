const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

const createOrder = async (req, res) => {
  try {
    const { DonationFrequency, DonationAmount, DonationCategory, Nationality } =
      req.body;
    const amount = DonationAmount * 100; // Convert amount to smallest currency unit (paise)

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
      notes: {
        DonationFrequency,
        DonationCategory,
        Nationality,
      },
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: "Donated successfully",
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_ID_KEY,
        });
      } else {
        console.error("Error creating order:", err);
        res.status(400).send({ success: false, msg: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  createOrder,
};
