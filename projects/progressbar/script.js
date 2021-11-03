const progressBar = document.querySelector(".progress");
const circles = document.querySelectorAll(".circle");
const steps = circles.length;

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let counter = 0;

prevBtn.addEventListener("click", function () {
  if (counter == 0) return;
  counter--;
  let progress = (100 / (steps - 1)) * counter;
  progressBar.style.width = progress + "%";
  addActive();
});

nextBtn.addEventListener("click", function () {
  if (counter == steps - 1) return;
  counter++;
  let progress = (100 / (steps - 1)) * counter;
  progressBar.style.width = progress + "%";
  addActive();
});

function addActive() {
  prevBtn.disabled = counter == 0 ? true : false;
  nextBtn.disabled = counter == steps - 1 ? true : false;
  for (let y = 0; y < steps; y++) {
    circles[y].classList.remove("active");
  }
  for (let i = 0; i <= counter; i++) {
    circles[i].classList.add("active");
  }
}
