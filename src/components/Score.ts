import { Text } from 'pixi.js';

export class Score {
  score = 0;

  text: Text;

  constructor() {
    this.text = new Text({
      text: 'Score: 0',
      style: {
        fill: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
      },
    });

    this.text.x = 20;
    this.text.y = 20;
  }

  update(delta: number) {
    this.score += delta * 0.1;

    this.text.text =
      `Score: ${Math.floor(this.score)}`;
  }
}