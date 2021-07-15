const playBtn = document.querySelector(".play");
const figures = document.querySelector(".figures");
const total = 10;

// figures - width, height
const figuresLength = figures.getBoundingClientRect();
const figuresLeft = figuresLength.left;
console.log(figuresLeft);
const figuresRight = figuresLength.right;
console.log(figuresRight);
const figuresTop = figuresLength.top;
console.log(figuresTop);
const figuresBottom = figuresLength.bottom;
console.log(figuresBottom);

function addMinions() {
  let x, y;
  for (let i = 0; i < total; i++) {
    const bob = document.createElement("img");
    bob.setAttribute("class", "minions");
    bob.src = "img/bob.png";
    const dave = document.createElement("img");
    dave.setAttribute("class", "minions");
    dave.src = "img/dave.png";
    let x1 = Math.floor(Math.random() * (figuresRight - figuresLeft - 100));
    let y1 = Math.floor(Math.random() * (figuresBottom - figuresTop - 100));
    bob.style.left = x1 + "px";
    bob.style.top = y1 + "px";
    let x2 = Math.floor(Math.random() * (figuresRight - figuresLeft - 100));
    let y2 = Math.floor(Math.random() * (figuresBottom - figuresTop - 100));
    dave.style.left = x2 + "px";
    dave.style.top = y2 + "px";
    figures.appendChild(bob);
    figures.appendChild(dave);
  }
}

playBtn.addEventListener("click", addMinions);
