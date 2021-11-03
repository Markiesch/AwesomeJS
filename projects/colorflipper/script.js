const result = document.querySelector(".output");
const button = document.querySelector(".submit");
const modeBtn = document.querySelector(".mode");
const root = document.querySelector(":root");
let mode = "hex";
let randomColor;

button.addEventListener("click", generate);

function generate() {
  if (mode == "hex") {
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } else {
    // Mode is rgb
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    randomColor = `rgb(${red}, ${green}, ${blue})`;
  }
  result.innerHTML = randomColor;
  root.style.setProperty("--color", randomColor);
}
generate();

modeBtn.addEventListener("click", toggleMode);

function toggleMode() {
  mode = mode == "hex" ? "rgb" : "hex";
  modeBtn.innerHTML = mode.toUpperCase();
}
