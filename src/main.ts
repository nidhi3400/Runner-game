import "./style.css";
import { Application } from "pixi.js";

import { createRoad } from "./components/Road";
import { Player } from "./components/Player";
import { Obstacle } from "./components/Obstacle";
import { checkCollision } from "./utils/checkCollision";

async function init() {
  const app = new Application();

  await app.init({
    resizeTo: window,
    background: "#0f172a",
  });

  document.getElementById("app")?.appendChild(app.canvas);

  // Road
  const road = createRoad(app.screen.width, app.screen.height);

  app.stage.addChild(road.container);

  // Lanes
  const lanes = [
    road.roadX + road.laneWidth * 0.5,
    road.roadX + road.laneWidth * 1.5,
    road.roadX + road.laneWidth * 2.5,
  ];

  // Player
  const player = new Player(lanes[1] - 30, app.screen.height - 150);

  app.stage.addChild(player.sprite);

  // Single obstacle
  const obstacle = new Obstacle(lanes[1] - 30, -100);

  obstacle.reset(lanes);

  app.stage.addChild(obstacle.sprite);

  // Game state
  let isGameOver = false;

  // Input
  window.addEventListener("keydown", (event) => {
    if (isGameOver) return;

    if (event.key === "ArrowLeft" && player.currentLane > 0) {
      player.moveToLane(player.currentLane - 1, lanes);
    }

    if (event.key === "ArrowRight" && player.currentLane < 2) {
      player.moveToLane(player.currentLane + 1, lanes);
    }
  });

  // Game Loop
  app.ticker.add((ticker) => {
    if (isGameOver) {
      return;
    }

    const speed = 8 * ticker.deltaTime;

    // Animate road markers
    road.roadMarkers.forEach((marker) => {
      marker.y += speed;

      if (marker.y > app.screen.height + 60) {
        marker.y = -60;
      }
    });

    // Update player
    player.update(ticker.deltaTime);

    // Update obstacle
    obstacle.update(ticker.deltaTime);

    // Respawn obstacle
    if (obstacle.sprite.y > app.screen.height) {
      obstacle.reset(lanes);
    }

    // Collision detection
    if (checkCollision(player.sprite, obstacle.sprite)) {
      isGameOver = true;

      player.sprite.tint = 0xff0000;

      console.log("GAME OVER");
    }
  });
}

init();
