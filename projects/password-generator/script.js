const lowerCaseEl = document.getElementById("lowerCase");
const upperCaseEl = document.getElementById("upperCase");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");
const generateEl = document.querySelector(".generate");
const passwordEl = document.querySelector(".password");
const amountEl = document.getElementById("length");
const copyEl = document.querySelector(".input--container svg");
let length = 15;

amountEl.addEventListener("change", () => {
  length = amountEl.value;
});

generateEl.addEventListener("click", generatePassword);
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

  if (!charset) {
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  passwordEl.value = password;
}

copyEl.addEventListener("click", copyPassword);

function copyPassword() {
  const text = passwordEl.value;
  // if (navigator.clipboard)
  return fallbackCopy(text);

  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  window.prompt("Copy to clipboard: Ctrl + C, Enter", text);
}
