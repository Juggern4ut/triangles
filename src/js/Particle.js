"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2D_1 = __importDefault(require("./Vector2D"));
class Particle {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
    }
    /**
     * Updates the Position of the Particle
     * @param progress deltatime since the last frame draw
     */
    update(progress, width, height) {
        if (this.position.x <= 0 || this.position.x >= width) {
            this.direction.multiply(new Vector2D_1.default(-1, 1));
        }
        if (this.position.y <= 0 || this.position.y >= height) {
            this.direction.multiply(new Vector2D_1.default(1, -1));
        }
        const tmp = this.direction.clone();
        const factor = new Vector2D_1.default(progress, progress);
        tmp.multiply(factor);
        this.position.add(tmp);
    }
    /**
     * Draws the Particle unto a given canvas
     * @param ctx The context to draw unto
     * @param color The Color of the Particle
     */
    draw(ctx, color = "#000000") {
        ctx.fillStyle = color;
        ctx.fillRect(this.position.x - 1, this.position.y - 1, 2, 2);
    }
}
exports.default = Particle;
//# sourceMappingURL=Particle.js.map