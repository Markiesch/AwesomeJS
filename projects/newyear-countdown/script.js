// Selecting DOM elements
const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minuteEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");

const currentYear = new Date().getFullYear();
const newYear = `1 Jan ${currentYear + 1}`;

function countdown() {
  const newYearsDate = new Date(newYear);
  const currentDate = new Date();
  const gap = (newYearsDate - currentDate) / 1000;

  const days = Math.floor(gap / 3600 / 24);
  const hours = Math.floor(gap / 3600) % 24;
  const mins = Math.floor(gap / 60) % 60;
  const seconds = Math.floor(gap) % 60;

  // Updating DOM elements
  daysEl.innerHTML = days;
  hoursEl.innerHTML = hours;
  minuteEl.innerHTML = mins;
  secondsEl.innerHTML = seconds;
}

// Initial setup
countdown();
setInterval(countdown, 1000);
