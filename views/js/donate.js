document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".donate-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    let donationAmount = formData.get("DonationAmount");

    // Check if custom amount is entered
    const customAmount = formData.get("customAmount");
    if (customAmount) {
      donationAmount = customAmount;
    }

    const data = {
      DonationFrequency: formData.get("DonationFrequency"),
      DonationAmount: donationAmount,
      DonationCategory: formData.get("donation-reason"),
      Nationality: formData.get("Nationality"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const options = {
          key: result.key_id,
          amount: result.amount,
          currency: "INR",
          name: "Donation",
          description: "Donation towards a cause",
          image: "https://dummyimage.com/600x400/000/fff",
          order_id: result.order_id,
          handler: function (response) {
            // API call to donatelist when payment is successful
            const donationDetails = {
              amount: result.amount,
              id: result.order_id,
              // Add other details as needed
            };
            fetch("http://localhost:3000/api/users/donatelist", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(donationDetails),
            })
              .then((response) => response.json())
              .then((data) => console.log(data))
              .catch((error) => console.error("Error:", error));

            alert("Payment successful");
          },
          prefill: {
            name: "Sanjay",
            email: "sanjay@gmail.com",
            contact: "7396449475",
          },
          notes: {
            description: result.description,
          },
          theme: {
            color: "#2300a3",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert("Payment failed. Error: " + response.error.description);
        });

        rzp1.open();
      } else {
        alert("Payment failed: " + result.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed: " + error.message);
    }
  });
});
