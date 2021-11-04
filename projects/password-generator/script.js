// selecting DOM elements
const lowerCaseEl = document.getElementById("lowerCase");
const upperCaseEl = document.getElementById("upperCase");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");
const generateEl = document.querySelector(".generate");
const passwordEl = document.querySelector(".password");
const amountEl = document.getElementById("length");
const copyEl = document.querySelector(".input--container svg");

let length = 15;

// Event Listeners
amountEl.addEventListener("change", () => (length = amountEl.value));
generateEl.addEventListener("click", generatePassword);
copyEl.addEventListener("click", copyPassword);

function generatePassword() {
  let lowerCase = "abcdefghijklmnopqrstuvwxyz";
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "1234567890";
  let symbols = "!@#$%^&*()_-+=";
  let charset = "";

  if (lowerCaseEl.checked) charset += lowerCase;
  if (upperCaseEl.checked) charset += upperCase;
  if (numberEl.checked) charset += numbers;
  if (symbolEl.checked) charset += symbols;

  if (!charset) return;

  let password = "";

  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  passwordEl.value = password;
}

function copyPassword() {
  const text = passwordEl.value;

  try {
    navigator.clipboard.writeText(text);
  } catch {
    // Fallback copy
    console.warn("Failed to copy to clipboard, using prompt instead...");
    window.prompt("Copy to clipboard: Ctrl + C, Enter", text);
  }
}

// Generate a password when the page loads
generatePassword();
