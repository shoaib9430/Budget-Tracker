// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://43.205.233.208:3000";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.getElementById("my-form");
const errorMessageElement = document.getElementById("error-message");

// Function to display an error message
function displayError(message) {
  errorMessageElement.textContent = message;
}

// Function to add a user
async function addUser() {
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const user = { name, email, password };

  try {
    console.log(user);
    const response = await axios.post(`${API_BASE_URL}/user/add-user`, user);

    if (response.status === 201) {
      // Registration successful
      const loginForm = document.getElementById("my-form");
      console.log("User added successfully:", response.data);
      displayError(""); // Clear any previous error message
      alert("Registration successful. You can now log in.");
      loginForm.action = "./login.html";
      loginForm.method = "get";
      loginForm.submit();
    } else {
      // Other server response errors
      const errorMessage = response.data.error;
      console.error("Error adding user:", errorMessage);
      displayError(errorMessage);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 409) {
        const errorMessage =
          "User with this email already exists. Please use a different email.";
        console.error("Error adding user:", errorMessage);
        displayError(errorMessage);
      } else {
        console.error("Network error:", err.message);
        displayError("Network error. Please try again.");
      }
    } else {
      console.error("Network error:", err.message);
      displayError("Network error. Please try again.");
    }
  }

  // Clear the form
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addUser();
});
