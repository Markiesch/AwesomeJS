// Selecting DOM elements
const deck = document.querySelector(".deck");
const victory = document.querySelector(".victory");
const tutorial = document.querySelector(".tutorial");
const counterEl = document.querySelector(".counter span");
const timer = document.querySelector(".timer span");

const AMOUNT_OF_CARDS = 16;
let moves = 0;
let clicks = 0;
let correctTurns = 0;
let openedCards = [];
let playTime = 0;
let cards = [];
let interval;

function startTimer() {
  interval = setInterval(function () {
    playTime++;
    timer.innerHTML = playTime;
  }, 1000);
}

function cardOpen() {
  // Returing if card is already turned around or already guessed correctly
  if (openedCards.includes(this) || this.classList.contains("correct")) return;

  this.classList.add("open");
  this.classList.add("show");
  openedCards.push(this);
  clicks++;

  if (clicks === 1) startTimer();

  if (openedCards.length === 2) {
    counterEl.innerHTML = ++moves;
    openedCards[0].dataset.type === openedCards[1].dataset.type ? matched() : unMatched();
  }

  if (correctTurns >= AMOUNT_OF_CARDS / 2) victory.classList.add("active");
}

function matched() {
  openedCards[0].classList.add("correct");
  openedCards[1].classList.add("correct");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
  correctTurns++;
}

function unMatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  deck.classList.add("disabled");
  setTimeout(() => {
    openedCards[0].classList.remove("show", "open", "unmatched");
    openedCards[1].classList.remove("show", "open", "unmatched");
    deck.classList.remove("disabled");
    openedCards = [];
  }, 1000);
}

function shuffle(cards) {
  let currentIndex = cards.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
  }
  return cards;
}

function init() {
  // Resetting variables
  cards = [];
  openedCards = [];
  moves = 0;
  clicks = 0;
  correctTurns = 0;
  playTime = 0;

  // Clearing DOM elements
  deck.innerHTML = "";
  counterEl.innerHTML = playTime;
  victory.classList.remove("active");

  createCards();
  createCards();
  function createCards() {
    const slots = [
      "assets/fruits/apple.png",
      "assets/fruits/banana.png",
      "assets/fruits/coconut.png",
      "assets/fruits/kiwi.png",
      "assets/fruits/melon.png",
      "assets/fruits/pear.png",
      "assets/fruits/pineapple.png",
      "assets/fruits/plum.png",
    ];
    for (let i = 0; i < AMOUNT_OF_CARDS / 2; i++) {
      const card = document.createElement("div");
      card.dataset.type = i + 1;
      card.classList.add("card");
      card.innerHTML = `<img src="${slots[i]}" />`;
      cards.push(card);
    }
  }

  const shuffledCards = shuffle(cards);
  for (const shuffledCard of shuffledCards) deck.append(shuffledCard);
  for (const card of cards) card.addEventListener("click", cardOpen);
  clearInterval(interval);
}

init();

document.querySelector(".victory button").addEventListener("click", init);
document.querySelector(".information").addEventListener("click", () => tutorial.classList.add("active"));
document.querySelector(".tutorial button").addEventListener("click", () => tutorial.classList.remove("active"));
