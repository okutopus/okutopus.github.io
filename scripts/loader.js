let spriteTimer;
let fallbackTimer;
const loader = document.querySelector("#loader");
const loaderSprite = document.querySelector("#loader-sprite");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function cycleSprites() {
  if (!loaderSprite) {
    return;
  }

  const frames = loaderSprite.dataset.frames.split(",");
  const currentIndex = frames.indexOf(loaderSprite.getAttribute("src"));
  const nextIndex = (currentIndex + 1) % frames.length;
  loaderSprite.src = frames[nextIndex];
}

function hideLoader() {
  if (!loader || loader.classList.contains("is-hidden")) {
    return;
  }

  loader.classList.add("is-hidden");
  window.clearTimeout(spriteTimer);
  window.clearTimeout(fallbackTimer);
  window.setTimeout(() => loader.remove(), prefersReducedMotion ? 0 : 320);
}

function startLoader() {
  if (!loader) {
    return;
  }

  if (document.readyState === "complete") {
    window.setTimeout(hideLoader, 720);
  } else {
    window.addEventListener("load", () => window.setTimeout(hideLoader, 720));
  }

  fallbackTimer = window.setTimeout(hideLoader, 3000);

  if (!prefersReducedMotion) {
    spriteTimer = window.setInterval(cycleSprites, 180);
  }
}

startLoader();
