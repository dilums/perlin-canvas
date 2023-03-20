const range = (n) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);
const random = (n) => Math.random() * n;
const randInt = (n) => Math.floor(random(n));
const randomColor = () =>
  `#${range(6)
    .map(() => randInt(10))
    .join("")}`;

const canvas = document.getElementById("canvas");
const { innerWidth, innerHeight } = window;
const h = (canvas.height = innerHeight);
const w = (canvas.width = innerWidth);

const ctx = canvas.getContext("2d");

const drawPoint = (x, y, c) => {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, 1, 1);
};

let currentHeight = (random(h) + h) * 0.25;
let currentSteps = randInt(200) + 100;
let currentColor = randomColor();
let currentOffest = random(h);

let i = 0;

const animate = (time) => {
  i += 1;

  if (i === currentSteps) {
    currentHeight = (random(h) + h) * 0.25;
    currentSteps = randInt(200) + 100;
    currentColor = randomColor();
    currentOffest = random(h);
    i = 0;
  }

  range(w).map((x) => {
    const y = currentHeight * noise.perlin2(x / 100, time + currentOffest);
    drawPoint(x, y + 0.5 * h, currentColor);
  });
};

const update = (time) => {
  animate(time * 0.0001);
  requestAnimationFrame(update);
};

update();
