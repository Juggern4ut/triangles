"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Particle_1 = __importDefault(require("./Particle"));
const Vector2D_1 = __importDefault(require("./Vector2D"));
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;
const particlesDom = document.querySelector("#particles");
let particleAmount = parseInt(particlesDom.value);
const distDom = document.querySelector("#connectDistance");
const hueDom = document.querySelector("#hue");
let lastRender = 0;
/**
 * The main game loop
 */
const loop = (timestamp) => {
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
const update = (progress) => {
    updateLinesBySlider();
    particles.forEach((p) => {
        p.update(progress, width, height);
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
const drawLine = (distance, start, end) => {
    const factor = 1 - distance / parseInt(distDom.value);
    ctx.strokeStyle = `hsla(${factor * 180 + parseInt(hueDom.value)}, 100%, 70%, ${factor})`;
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
    }
    else if (t > v) {
        const delta = t - v;
        addParticles(delta);
    }
    particleAmount = particles.length;
};
/**
 * Adds a given amount of particles to the scene
 * @param amount The amount to add
 */
const addParticles = (amount) => {
    for (let i = 0; i < amount; i++) {
        particles.push(new Particle_1.default(new Vector2D_1.default(Math.random() * width, Math.random() * height), new Vector2D_1.default(Math.random() * 2 - 1, Math.random() * 2 - 1)));
    }
};
window.requestAnimationFrame(loop);
addParticles(particleAmount);
//# sourceMappingURL=main.js.map