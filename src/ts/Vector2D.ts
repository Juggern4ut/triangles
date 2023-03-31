export default class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Adds a given vector to this one
   * @param other The other vector to add
   */
  add(other: Vector2D) {
    this.x += other.x;
    this.y += other.y;
  }

  /**
   * Multiplies a given vector to this one
   * @param other The vector to multiply
   */
  multiply(other: Vector2D) {
    this.x *= other.x;
    this.y *= other.y;
  }

  /**
   * Creates a copy of this vector
   * @returns A clone of the vector
   */
  clone() {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Returns the distance between this vecor and a given one
   * @param other The Vector to get the distance to
   * @returns The calculated distance
   */
  dist(other: Vector2D): number {
    const deltaX = Math.abs(this.x - other.x);
    const deltaY = Math.abs(this.y - other.y);
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  }
}
