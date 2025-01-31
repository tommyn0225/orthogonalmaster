// Code Practice: Beyond Orthogonal
// Name: Tommy Nguyen
// Date: Jan 25 2025

// Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites

"use strict";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  render: { pixelArt: true },
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
  scene: [Movement],
};

const game = new Phaser.Game(config);
const cursors = {};
const { height, width } = game.config;