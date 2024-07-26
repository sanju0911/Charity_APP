const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match");
    return;
  }

  const formData = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json(); // Parse response JSON
    if (response.status === 200) {
      alert("Signup successful");
      window.location.href = "login.html";
    } else if (response.status === 400) {
      alert("Email already exists");
    } else {
      alert("Signup failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Signup failed");
  }
});
