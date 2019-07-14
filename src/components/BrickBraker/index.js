import React, { useState } from 'react';

import Paddle from 'Components/Paddle';
import Ball from 'Components/Ball';
import Bricks from 'Components/Bricks';
import Walls from 'Components/Walls';

const SPEED = 20;

class Game {
  constructor(canvas, autoStart) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.setup();

    if (autoStart) {
      this.start();
    }
  }

  setup() {    
    this.bricks = new Bricks(this.canvas, this.ctx);
    this.paddle = new Paddle(this.canvas, this.ctx);
    this.ball = new Ball(this.canvas, this.ctx);
    this.walls = new Walls(this.canvas, this.ctx);
  }

  reStart() {
    this.stop();
    this.setup();
    this.start();
  }

  isGameOver() {
    if(this.ball.hitBottomWall(this.walls.bottom)) {
      this.stop();
      this.drawLoosing();
    }
  }

  isWon() {
    if(this.bricks.allStatusIsZero()) {
      this.stop();
      this.drawWinning();
    }
  }

  drawWinning() {
    this.ctx.font = '48px serif';
    this.ctx.textAlign="center"
    this.ctx.fillText('YOU WON', this.canvas.width / 2, this.canvas.height / 2);
  }

  drawLoosing() {
    this.ctx.font = '48px serif';
    this.ctx.textAlign="center"
    this.ctx.fillText('YOU LOST', this.canvas.width / 2, this.canvas.height / 2);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.draw();
    this.ball.draw();
    this.paddle.draw();

    this.ball.collideWithBricks(this.bricks)
    this.ball.collideWithPaddle(this.paddle)
    this.ball.collideWithWalls(this.walls)

    this.isGameOver();
    this.isWon();

    this.paddle.update();
    this.ball.update();
  }

  start() {
    this.gameLoopId = setInterval(this.draw.bind(this), SPEED);
  }

  stop() {
    clearInterval(this.gameLoopId);
  }
}

export default Game;
