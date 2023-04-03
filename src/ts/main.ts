import Particle from "./Particle";
import Vector2D from "./Vector2D";

const canvas = document.querySelector("#game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const particles: Particle[] = [];

const particlesDom = document.querySelector("#particles") as HTMLInputElement;
let particleAmount = parseInt(particlesDom.value);

const distDom = document.querySelector("#connectDistance") as HTMLInputElement;
const hueDom = document.querySelector("#hue") as HTMLInputElement;
const speedDom = document.querySelector("#speed") as HTMLInputElement;

const infoLabel = document.querySelector("#infos") as HTMLSpanElement;

const openHelp = document.querySelector("#openHelp");
const help = document.querySelector("#help");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

let touchX = 0;
let touchY = 0;

let timeout = 0;

let lastRender = 0;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
});

/**
 * The main game loop
 */
const loop = (timestamp: number) => {
  const progress = timestamp - lastRender;

  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

/**
 * Updates the whole scene
 * @param progress The delta time since the last draw
 */
const update = (progress: number) => {
  updateLinesBySlider();
  particles.forEach((p) => {
    const delta = progress * (parseInt(speedDom.value) / 100);
    p.update(delta, width, height);
  });
};

/**
 * Draws the scene
 */
const draw = () => {
  clearScreen();
  particles.forEach((p) => {
    particles.forEach((p2) => {
      const dist = p.position.dist(p2.position);
      if (dist < parseInt(distDom.value)) {
        drawLine(dist, p, p2);
      }
    });
    p.draw(ctx, "rgba(255, 255, 255, 0.6)");
  });
};

/**
 * Initializes the controls for touch devices
 */
const initTouchHandles = () => {
  canvas.addEventListener("touchstart", (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  });

  canvas.addEventListener("touchmove", (e) => {
    const deltaX = (e.touches[0].clientX - touchX) * 0.2;
    const deltaY = touchY - e.touches[0].clientY;

    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;

    if (e.touches[0].clientY >= canvas.height - 100) {
      const newParticles = parseInt(particlesDom.value) + deltaX;
      particlesDom.value = newParticles.toString();
      showInfos(`Particles: ${particlesDom.value}`);
    } else if (e.touches[0].clientY >= canvas.height - 200) {
      const newSpeed = parseInt(speedDom.value) + deltaX;
      speedDom.value = newSpeed.toString();
      showInfos(`Speed: ${speedDom.value}`);
    } else if (e.touches[0].clientX <= 100) {
      const newHue = parseInt(hueDom.value) + deltaY;
      hueDom.value = newHue.toString();
      showInfos(`Hue: ${hueDom.value}`);
    } else if (e.touches[0].clientX >= canvas.width - 100) {
      const newDistance = parseInt(distDom.value) + deltaY;
      distDom.value = newDistance.toString();
      showInfos(`Distance: ${distDom.value}`);
    }
  });
};

/**
 * Initializes the controls to open the help view
 */
const initOpenHelp = () => {
  openHelp?.addEventListener("click", () => {
    if (openHelp.classList.contains("open")) {
      openHelp.innerHTML = "?";
      openHelp?.classList.remove("open");
      help?.classList.remove("open");
    } else {
      openHelp.innerHTML = "X";
      openHelp?.classList.add("open");
      help?.classList.add("open");
    }
  });
};

/**
 * Clear the screen for the next draw
 */
const clearScreen = () => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
};

/**
 * Draws a line between two particles
 * @param distance The distance between the start and end of the line
 * @param start The start of the line
 * @param end The end of the line
 */
const drawLine = (distance: number, start: Particle, end: Particle) => {
  const factor = 1 - distance / parseInt(distDom.value);
  ctx.strokeStyle = `hsla(${
    factor * 180 + parseInt(hueDom.value)
  }, 100%, 70%, ${factor})`;
  ctx.lineWidth = 4 * factor;
  ctx.beginPath();
  ctx.moveTo(start.position.x, start.position.y);
  ctx.lineTo(end.position.x, end.position.y);
  ctx.stroke();
  ctx.closePath();
};

/**
 * Adds or removes particles if the slider on the dom has
 * changed its value
 */
const updateLinesBySlider = () => {
  const t = parseInt(particlesDom.value);
  const v = particles.length;
  if (t < v) {
    const delta = v - t;
    particles.splice(v - delta, delta);
  } else if (t > v) {
    const delta = t - v;
    addParticles(delta);
  }
  particleAmount = particles.length;
};

/**
 * Adds a given amount of particles to the scene
 * @param amount The amount to add
 */
const addParticles = (amount: number) => {
  for (let i = 0; i < amount; i++) {
    particles.push(
      new Particle(
        new Vector2D(Math.random() * width, Math.random() * height),
        new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1)
      )
    );
  }
};

/**
 * Shows a infotext that will fade out after 500ms
 * @param text The text to display
 */
const showInfos = (text: string) => {
  infoLabel.innerHTML = text;
  infoLabel.classList.add("visible");
  clearTimeout(timeout);
  timeout = window.setTimeout(() => {
    infoLabel.classList.remove("visible");
  }, 500);
};

window.requestAnimationFrame(loop);
addParticles(particleAmount);
initTouchHandles();
initOpenHelp();
