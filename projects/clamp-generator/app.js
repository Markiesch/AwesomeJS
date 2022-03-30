const resultEl = document.querySelector(".result");
const textArea = document.querySelector("textarea");
const output = document.querySelector(".output");
const inputs = document.querySelectorAll("input");
let result;

output.addEventListener("click", copy);
for (const input of inputs) input.addEventListener("input", generateResult);

function copy() {
  const text = resultEl.innerHTML;

  try {
    navigator.clipboard.writeText(text);
  } catch {
    console.warn("Failed to copy to clipboard, using prompt instead...");
    window.prompt("Copy to clipboard: Ctrl + C, Enter", text);
  }
}

function generateResult() {
  const minWidthPx = +document.querySelector("#minWidth").value;
  const maxWidthPx = +document.querySelector("#maxWidth").value;
  const minFontSize = +document.querySelector("#minFont").value;
  const maxFontSize = +document.querySelector("#maxFont").value;
  const pixelsPerRem = +document.querySelector("#pixels").value;

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  resultEl.innerHTML = `clamp(${fixNumber(minFontSize)}rem, ${fixNumber(yAxisIntersection)}rem + ${fixNumber(slope * 100)}vw, ${fixNumber(maxFontSize)}rem)`;
}

function fixNumber(value) {
  return Math.round(value * 100) / 100;
}

generateResult();
