import { Graphics } from 'pixi.js';

export class Obstacle {
  sprite: Graphics;

  constructor(x: number, y: number) {
    this.sprite = new Graphics();

    this.sprite.roundRect(
      0,
      0,
      60,
      60,
      8
    );

    this.sprite.fill('#ef4444');

    this.sprite.x = x;
    this.sprite.y = y;
  }

  update(delta: number) {
    this.sprite.y += 12 * delta;
  }

  reset(
    lanePositions: number[]
  ) {
    const randomLane =
      Math.floor(
        Math.random() * lanePositions.length
      );

    this.sprite.x =
      lanePositions[randomLane] - 30;

    this.sprite.y = -100;
  }
}