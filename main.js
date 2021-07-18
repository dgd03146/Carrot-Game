"use strict";

let win;
let total = 10;
let timeLeft = 10;
let timerId;
let level = 1;
let bobElement, daveElement, kevinElement, stuartElement;
// const minions = ["bob", "dave", "kevin", "stuart"];

const timer = document.querySelector(".timer");
timer.innerText = timeLeft;
const count = document.querySelector(".count");
count.innerHTML = `<span class="number">${total}</span>`;
// figures - width, height
const figures = document.querySelector(".figures");
const figuresLength = figures.getBoundingClientRect();
const figuresLeft = figuresLength.left;
const figuresRight = figuresLength.right;
const figuresTop = figuresLength.top;
const figuresBottom = figuresLength.bottom;
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
  minion.setAttribute("class", "minions");
  minion.setAttribute("data-key", name);
  minion.src = `img/${name}.png`;
  let x1 = Math.floor(Math.random() * (figuresRight - figuresLeft - 75));
  let y1 = Math.floor(Math.random() * (figuresBottom - figuresTop - 75));
  minion.style.left = x1 + "px";
  minion.style.top = y1 + "px";
  figures.appendChild(minion);
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
    lose();
    pauseTime();
    return;
  } else {
    // remove all minions
    if (document.body.contains(replay)) {
      figures.querySelectorAll("*").forEach((minion) => minion.remove());
    }
    // play
    total = 10;
    count.innerHTML = `<span class="number">${total}</span>`;
    bgMusic.play();
    addMinions();
    playBtn.setAttribute("class", "fas fa-square");
    resetTime();
  }
}

// when click, remove minions
figures.addEventListener("click", (event) => {
  if (document.body.contains(replay)) {
    pauseTime();
    return;
  }
  const target = event.target;
  const name = target.dataset.key;
  if (name === "bob") {
    figures.removeChild(target);
    total--;
    count.innerHTML = `<span class="number">${total}</span>`;
    if (total === 0) {
      if (level === 3) {
        win = "Congraturation 🎉";
        figures.appendChild(replayDisplay(win));
        level = 1;
        playBtn.setAttribute("class", "fas fa-play");
        pauseTime();
      } else {
        win = "NEXT LEVEL 🎉";
        figures.appendChild(replayDisplay(win));
        pauseTime();
        playBtn.setAttribute("class", "fas fa-play");
      }
    }
  } else if (name === "dave" || name === "kevin" || name === "stuart") {
    lose();
    pauseTime();
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
    lose();
    clearTimeout(timerId);
  }
  timer.innerText = timeLeft;
}

// pop up when win or lose
function replayDisplay(win) {
  replay.setAttribute("class", "replay");
  if (win === "YOU LOST 🤣") {
    replay.innerHTML = `<button class="replayBtn"><i class="fas fa-undo" data-key="undo"></i></button>
  <span class="description">${win}</span>`;
  } else if (win === "NEXT LEVEL 🎉") {
    replay.innerHTML = `<button class="replayBtn"><i class="fas fa-arrow-right" data-key="next"></i></button>
  <span class="description">${win}</span>`;
  } else {
    replay.innerHTML = `<span class="description">${win}</span>`;
  }
  return replay;
}
// when click, replay Btn
replay.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.key;
  if (name === "undo") {
    bgReset();
    resetTime();
    playGame();
  } else if (name === "next") {
    resetTime();
    level++;
    playGame();
  }
});

// when lose game
function lose() {
  bgReset();
  win = "YOU LOST 🤣";
  playBtn.setAttribute("class", "fas fa-play");
  figures.appendChild(replayDisplay(win));
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
