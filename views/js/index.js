document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formData = {
      firstName,
      lastName,
      email,
      message,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully");
      } else {
        alert(`Error: ${data.message || "Message sending failed"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Message sending failed");
    }
  });

  const volunteerForm = document.getElementById("volunteer-form");

  volunteerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("volunteer-name").value;
    const email = document.getElementById("volunteer-email").value;
    const subject = document.getElementById("volunteer-subject").value;
    const message = document.getElementById("volunteer-message").value;

    const formData = {
      name,
      email,
      subject,
      message,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/users/volunteer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Form submitted successfully");
      } else {
        alert(`Error: ${data.message || "Form submission failed"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Form submission failed");
    }
  });
});

// Create an async function to fetch donation count from the API
async function fetchDonationCount() {
  try {
    const response = await fetch("http://localhost:3000/api/users/donateCount");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Assuming the API response contains the donation count in a property called 'count'
    const donationCount = data.NUmbers;

    // Update the DOM with the fetched donation count
    document.querySelector(".counter-number").innerText = donationCount;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Set an interval to fetch the donation count every 3 minutes (180,000 milliseconds)
setInterval(fetchDonationCount, 180000);

// Fetch the donation count immediately when the script is first loaded
fetchDonationCount();
