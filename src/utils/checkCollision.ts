import { Container } from 'pixi.js';

export function checkCollision(
  a: Container,
  b: Container
) {
  const boundsA = a.getBounds();
  const boundsB = b.getBounds();

  return (
    boundsA.x < boundsB.x + boundsB.width &&
    boundsA.x + boundsA.width > boundsB.x &&
    boundsA.y < boundsB.y + boundsB.height &&
    boundsA.y + boundsA.height > boundsB.y
  );
}