import Vector2D from "./Vector2D";

export default class Particle {
  position: Vector2D;
  direction: Vector2D;

  constructor(position: Vector2D, direction: Vector2D) {
    this.position = position;
    this.direction = direction;
  }

  /**
   * Updates the Position of the Particle
   * @param progress deltatime since the last frame draw
   */
  update(progress: number, width: number, height: number): void {
    if (this.position.x <= 0 || this.position.x >= width) {
      this.direction.multiply(new Vector2D(-1, 1));
    }
    if (this.position.y <= 0 || this.position.y >= height) {
      this.direction.multiply(new Vector2D(1, -1));
    }

    const tmp = this.direction.clone();
    const factor = new Vector2D(progress, progress);
    tmp.multiply(factor);

    this.position.add(tmp);
    this.resetPosition(width, height);
  }

  /**
   * Puts the particle back into the canvas if it happens
   * to go out of bounds somehow
   * @param width The width of the canvas
   * @param height The height of the canvas
   */
  resetPosition(width: number, height: number): void {
    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x > width) {
      this.position.x = width;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y > height) {
      this.position.y = height;
    }
  }

  /**
   * Draws the Particle unto a given canvas
   * @param ctx The context to draw unto
   * @param color The Color of the Particle
   */
  draw(ctx: CanvasRenderingContext2D, color = "#000000"): void {
    ctx.fillStyle = color;
    ctx.fillRect(this.position.x - 1, this.position.y - 1, 2, 2);
  }
}
