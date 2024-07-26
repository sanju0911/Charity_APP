const loginForm = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const formData = {
    email,
    password,
  };

  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json(); // Parse response JSON

    if (response.status === 200) {
      // Redirect to dashboard or any other page after successful login
      window.location.href = "index.html";
    } else if (response.status === 401) {
      alert("Invalid email or password");
    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login failed");
  }
});
