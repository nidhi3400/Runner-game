import { Container, Graphics } from 'pixi.js';

export function createRoad(
  screenWidth: number,
  screenHeight: number
) {
  const container = new Container();

  const roadWidth = 500;
  const roadX = screenWidth / 2 - roadWidth / 2;
  const laneWidth = roadWidth / 3;

  // Grass
  const leftGrass = new Graphics();

  leftGrass.rect(
    0,
    0,
    roadX,
    screenHeight
  );

  leftGrass.fill('#1f4d2e');

  container.addChild(leftGrass);

  const rightGrass = new Graphics();

  rightGrass.rect(
    roadX + roadWidth,
    0,
    screenWidth,
    screenHeight
  );

  rightGrass.fill('#1f4d2e');

  container.addChild(rightGrass);

  // Road
  const road = new Graphics();

  road.rect(
    roadX,
    0,
    roadWidth,
    screenHeight
  );

  road.fill('#3a3a3a');

  container.addChild(road);

  // Lane separators
  const laneLines = new Graphics();

  for (let i = 1; i < 3; i++) {
    const x = roadX + laneWidth * i;

    laneLines.moveTo(x, 0);
    laneLines.lineTo(x, screenHeight);
  }

  laneLines.stroke({
    color: '#555555',
    width: 2,
  });

  container.addChild(laneLines);

  // Moving road markers
  const roadMarkers: Graphics[] = [];

  for (let lane = 1; lane < 3; lane++) {
    const markerX = roadX + laneWidth * lane;

    for (let y = -100; y < screenHeight; y += 120) {
      const marker = new Graphics();

      marker.rect(-3, 0, 6, 60);
      marker.fill('#ffffff');

      marker.x = markerX;
      marker.y = y;

      roadMarkers.push(marker);
      container.addChild(marker);
    }
  }

  return {
    container,
    roadX,
    roadWidth,
    laneWidth,
    roadMarkers,
  };
}