"use strict";

let total = 10;
const count = document.querySelector(".count");
count.innerHTML = `<span class="number">${total}</span>`;
// figures - width, height
const figures = document.querySelector(".figures");
const figuresLength = figures.getBoundingClientRect();
const figuresLeft = figuresLength.left;
const figuresRight = figuresLength.right;
const figuresTop = figuresLength.top;
const figuresBottom = figuresLength.bottom;

// when play Btn, display minons random location
function addMinions() {
  if (figures.classList.contains(".replay")) {
    return;
  }
  for (let i = 0; i < total; i++) {
    const bobElement = document.createElement("img");
    const daveElement = document.createElement("img");
    createMinion(bobElement, "bob");
    createMinion(daveElement, "dave");
  }
}
function createMinion(minion, name) {
  minion.setAttribute("class", "minions");
  minion.setAttribute("data-key", name);
  minion.src = `img/${name}.png`;
  let x1 = Math.floor(Math.random() * (figuresRight - figuresLeft - 80));
  let y1 = Math.floor(Math.random() * (figuresBottom - figuresTop - 80));
  minion.style.left = x1 + "px";
  minion.style.top = y1 + "px";
  figures.appendChild(minion);
}

// change playBtn => stopBtn
const imgBtn = document.querySelector(".play>i");
imgBtn.addEventListener("click", (event) => {
  addMinions();
  imgBtn.setAttribute("class", "fas fa-square");
});

const replay = document.createElement("div"); // 전역으로 하나만 만들어놔서 하나만 생성된다.
const minions = document.querySelector(".minions");

// when click, remove minions
figures.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.key;
  let win;
  if (name === "bob") {
    figures.removeChild(target);
    total--;
    count.innerHTML = `<span class="number">${total}</span>`;
    if (total === 0) {
      win = "WON 🎉";
      figures.appendChild(replayDisplay(win));
    }
  } else if (name === "dave") {
    win = "LOST 🤣";
    figures.appendChild(replayDisplay(win));
  }
});

function replayDisplay(win) {
  replay.setAttribute("class", "replay");
  replay.innerHTML = `<button class="replayBtn"><i class="fas fa-undo"></i></button>
  <span class="description">YOU ${win}</span>`;
  return replay;
}
