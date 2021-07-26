"use strict";

const MINION_SIZE = 75;
let message;
let total = 10;
let timeLeft = 10;
let timerId;
let level = 1;
let bobElement, daveElement, kevinElement, stuartElement;

//sound
const bobSound = new Audio("sound/carrot_pull.mp3");
const minionSound = new Audio("sound/bug_pull.mp3");
const winSound = new Audio("sound/game_win.mp3");
const alertSound = new Audio("sound/alert.wav");

const timer = document.querySelector(".timer");
const count = document.querySelector(".count");

// figures - width, height
const figures = document.querySelector(".figures");
const figuresRect = figures.getBoundingClientRect();
const replay = document.createElement("div"); // 전역으로 하나만 만들어놔서 하나만 생성된다.

// when play Btn, display minons random location
function addMinions() {
  if (level === 1) {
    for (let i = 0; i < total; i++) {
      setElement(bobElement, "bob");
      setElement(daveElement, "dave");
    }
  } else if (level === 2) {
    for (let i = 0; i < total; i++) {
      setElement(bobElement, "bob");
      setElement(daveElement, "dave");
      setElement(kevinElement, "kevin");
    }
  } else if (level === 3) {
    for (let i = 0; i < total; i++) {
      setElement(bobElement, "bob");
      setElement(daveElement, "dave");
      setElement(kevinElement, "kevin");
      setElement(stuartElement, "stuart");
    }
  }
}

function setElement(Element, name) {
  Element = document.createElement("img");
  createMinion(Element, name);
}

function createMinion(minion, name) {
  const x1 = 0;
  const y1 = 0;
  const x2 = figuresRect.width - MINION_SIZE;
  const y2 = figuresRect.height - MINION_SIZE;
  minion.setAttribute("class", "minions");
  minion.setAttribute("data-key", name);
  minion.src = `img/${name}.png`;
  const x = randomNumber(x1, x2);
  const y = randomNumber(y1, y2);
  minion.style.left = x + "px";
  minion.style.top = y + "px";
  figures.appendChild(minion);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// change playBtn => stopBtn
const bgMusic = new Audio("sound/나비보벳따우.mp3");
const playBtn = document.querySelector(".play>i");
playBtn.addEventListener("click", () => {
  playGame();
});

function playGame() {
  pauseTime();
  timerId = setInterval(() => {
    countDown();
  }, 1000);
  if (playBtn.classList.value === "fas fa-square") {
    // 정지버튼 눌렀을때
    alertSound.play();
    lose();
    return;
  } else {
    figures.innerHTML = "";
    // play
    initGame();
  }
}

function initGame() {
  total = 10;
  count.innerHTML = `<span class="number">${total}</span>`;
  bgMusic.play();
  addMinions();
  playBtn.setAttribute("class", "fas fa-square");
  resetTime();
}

// when click, remove minions
figures.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.key;
  if (name === "bob") {
    figures.removeChild(target);
    bobSound.play();
    total--;
    count.innerHTML = `<span class="number">${total}</span>`;
    win();
  } else if (name === "dave" || name === "kevin" || name === "stuart") {
    minionSound.play();
    lose();
  }
});

// timer
function pauseTime() {
  clearInterval(timerId);
}

function resetTime() {
  timeLeft = 10;
  timer.innerText = timeLeft;
}

function countDown() {
  timeLeft--;
  if (timeLeft === 0) {
    minionSound.play();
    lose();
  }
  timer.innerText = timeLeft;
}

// pop up when win or lose
function replayDisplay(msg) {
  replay.setAttribute("class", "replay");
  if (msg === "YOU LOST 🤣") {
    replay.innerHTML = `<button class="replayBtn"><i class="fas fa-undo" data-key="undo"></i></button>
  <span class="description">${msg}</span>`;
  } else if (msg === "NEXT LEVEL 🎉") {
    replay.innerHTML = `<button class="replayBtn"><i class="fas fa-arrow-right" data-key="next"></i></button>
  <span class="description">${msg}</span>`;
  } else {
    replay.innerHTML = `<span class="description">${msg}</span>`;
  }
  return replay;
}
// when click, replay Btn
replay.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.key;
  if (name === "undo") {
    undoGame();
  } else if (name === "next") {
    nextGame();
  }
});

function undoGame() {
  bgReset();
  resetTime();
  playGame();
}

function nextGame() {
  resetTime();
  level++;
  playGame();
}

// when lose game
function lose() {
  bgReset();
  message = "YOU LOST 🤣";
  playBtn.setAttribute("class", "fas fa-play");
  figures.appendChild(replayDisplay(message));
  pauseTime();
}

// when win game
function win() {
  if (total === 0) {
    winSound.play();
    if (level === 3) {
      message = "Congraturation 🎉";
      level = 1;
    } else {
      message = "NEXT LEVEL 🎉";
    }
    figures.appendChild(replayDisplay(message));
    pauseTime();
    playBtn.setAttribute("class", "fas fa-play");
  }
}

// bacground music reset
function bgReset() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

// modal
Swal.fire({
  title: "MY name is Bob!",
  text: "Click and remove!",
  imageUrl: "img/bigbob.png",
  imageAlt: "Bob",
});
