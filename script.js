const loader = document.querySelector("#loader");
const loaderSprite = document.querySelector("#loader-sprite");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const frames = [
  "./assets/loading/oku-1.svg",
  "./assets/loading/oku-2.svg"
];

let frameIndex = 0;
let spriteTimer;

function showNextFrame() {
  frameIndex = (frameIndex + 1) % frames.length;
  loaderSprite.src = frames[frameIndex];
}

function hideLoader() {
  if (loader.classList.contains("is-hidden")) {
    return;
  }

  loader.classList.add("is-hidden");
  window.clearTimeout(spriteTimer);
  window.setTimeout(() => loader.remove(), prefersReducedMotion ? 0 : 320);
}

if (!prefersReducedMotion) {
  spriteTimer = window.setInterval(showNextFrame, 180);
}

window.addEventListener("load", () => {
  window.setTimeout(hideLoader, loader.dataset.duration ? Number(loader.dataset.duration) : 720);
});

window.setTimeout(hideLoader, 3000);
