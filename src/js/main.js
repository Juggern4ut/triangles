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
const LINE_DISTANCE = 400;
const width = canvas.width;
const height = canvas.height;
let lastRender = 0;
for (let i = 0; i < 25; i++) {
    particles.push(new Particle_1.default(new Vector2D_1.default(Math.random() * width, Math.random() * height), new Vector2D_1.default(Math.random() * 2 - 1, Math.random() * 2 - 1)));
}
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
    particles.forEach((p) => {
        p.update(progress, width, height);
    });
};
/**
 * Draws the scene
 */
const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    particles.forEach((p) => {
        particles.forEach((p2) => {
            const dist = p.position.dist(p2.position);
            if (dist < LINE_DISTANCE) {
                drawLine(dist, p, p2);
            }
        });
        p.draw(ctx, "rgba(255, 255, 255, 0.6)");
    });
};
/**
 * Draws a line between two particles
 * @param distance The distance between the start and end of the line
 * @param start The start of the line
 * @param end The end of the line
 */
const drawLine = (distance, start, end) => {
    const factor = 1 - distance / LINE_DISTANCE;
    ctx.strokeStyle = `hsla(${factor * 180 + 90}, 100%, 70%, ${factor})`;
    ctx.lineWidth = 4 * factor;
    ctx.beginPath();
    ctx.moveTo(start.position.x, start.position.y);
    ctx.lineTo(end.position.x, end.position.y);
    ctx.stroke();
    ctx.closePath();
};
window.requestAnimationFrame(loop);
//# sourceMappingURL=main.js.map