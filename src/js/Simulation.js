"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomHandler_1 = __importDefault(require("./DomHandler"));
const Particle_1 = __importDefault(require("./Particle"));
const Vector2D_1 = __importDefault(require("./Vector2D"));
class Simulation {
    constructor(canvas) {
        this.particles = [];
        this.lastRender = 0;
        /**
         * The main game loop
         */
        this.loop = (timestamp) => {
            const progress = timestamp - this.lastRender;
            this.update(progress);
            this.draw();
            this.lastRender = timestamp;
            window.requestAnimationFrame(this.loop);
        };
        /**
         * Updates the whole scene
         * @param progress The delta time since the last draw
         */
        this.update = (progress) => {
            this.updateLinesBySlider();
            this.particles.forEach((p) => {
                if (this.domHandler.speedDom) {
                    const delta = progress * (parseInt(this.domHandler.speedDom.value) / 100);
                    p.update(delta, this.canvas.width, this.canvas.height);
                }
            });
        };
        /**
         * Adds or removes particles if the slider on the dom has
         * changed its value
         */
        this.updateLinesBySlider = () => {
            if (!this.domHandler.particlesDom)
                return;
            const t = parseInt(this.domHandler.particlesDom.value);
            const v = this.particles.length;
            if (t < v) {
                const delta = v - t;
                this.particles.splice(v - delta, delta);
            }
            else if (t > v) {
                const delta = t - v;
                this.addParticles(delta);
            }
        };
        /**
         * Adds a given amount of particles to the scene
         * @param amount The amount to add
         */
        this.addParticles = (amount) => {
            for (let i = 0; i < amount; i++) {
                this.particles.push(new Particle_1.default(new Vector2D_1.default(Math.random() * this.canvas.width, Math.random() * this.canvas.height), new Vector2D_1.default(Math.random() * 2 - 1, Math.random() * 2 - 1)));
            }
        };
        /**
         * Draws the scene
         */
        this.draw = () => {
            this.clearScreen();
            this.particles.forEach((p) => {
                this.particles.forEach((p2) => {
                    const dist = p.position.dist(p2.position);
                    if (this.domHandler.distDom &&
                        dist < parseInt(this.domHandler.distDom.value)) {
                        this.drawLine(dist, p, p2);
                    }
                });
                p.draw(this.ctx, "rgba(255, 255, 255, 0.6)");
            });
        };
        /**
         * Clear the screen for the next draw
         */
        this.clearScreen = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#000";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        };
        /**
         * Draws a line between two particles
         * @param distance The distance between the start and end of the line
         * @param start The start of the line
         * @param end The end of the line
         */
        this.drawLine = (distance, start, end) => {
            if (!this.domHandler.distDom || !this.domHandler.hueDom)
                return;
            const factor = 1 - distance / parseInt(this.domHandler.distDom.value);
            this.ctx.strokeStyle = `hsla(${factor * 180 + parseInt(this.domHandler.hueDom.value)}, 100%, 70%, ${factor})`;
            this.ctx.lineWidth = 4 * factor;
            this.ctx.beginPath();
            this.ctx.moveTo(start.position.x, start.position.y);
            this.ctx.lineTo(end.position.x, end.position.y);
            this.ctx.stroke();
            this.ctx.closePath();
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.domHandler = new DomHandler_1.default(this.canvas);
        if (this.domHandler.particlesDom) {
            this.addParticles(parseInt(this.domHandler.particlesDom.value));
        }
        window.requestAnimationFrame(this.loop);
    }
}
exports.default = Simulation;
//# sourceMappingURL=Simulation.js.map