import { Graphics } from 'pixi.js';

export class Player {
  sprite: Graphics;

  currentLane = 1;
  targetX = 0;

  constructor(initialX: number, initialY: number) {
    this.sprite = new Graphics();

    this.sprite.roundRect(
      0,
      0,
      60,
      100,
      12
    );

    this.sprite.fill('#60a5fa');

    this.sprite.x = initialX;
    this.sprite.y = initialY;

    this.targetX = initialX;
  }

  moveToLane(
    laneIndex: number,
    lanePositions: number[]
  ) {
    this.currentLane = laneIndex;

    this.targetX =
      lanePositions[laneIndex] - 30;
  }

  update(delta: number) {
    this.sprite.x +=
      (this.targetX - this.sprite.x) *
      0.15 *
      delta;
  }
}