import { getRandomInt } from '../../lib/helpers';

class Ball {
  constructor(canvas, ctx, radius = 10) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.radius = radius;
    this.x = getRandomInt(0, canvas.width);
    this.y = (canvas.height - radius * 2 - 100);
    this.dx = 2;
    this.dy = -2;
  }

  draw(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#FC2530";
    this.ctx.fill();
    this.ctx.closePath();
  }

  changeXDirection() {
    this.dx = -this.dx;
  }

  changeYDirection() {
    this.dy = -this.dy;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  hitRightWall(rightWall) {
    return this.x + this.dx >= (rightWall - this.radius);
  }

  hitLeftWall(leftWall) {
    return this.x + this.dx < (leftWall + this.radius);
  }

  hitTopWall(topWall) {
    return this.y + this.dy < (topWall + this.radius);
  }

  hitBottomWall(bottomWall) {
    return this.y + this.dy > (bottomWall - this.radius);
  }

  collideWithPaddle(paddle) {
    if(paddle.collisionDetection(this)) {
      this.changeYDirection();
      return true;
    }
    return false;
  }

  collideWithBricks(bricks) {
    if(bricks.collisionDetection(this)) {
      this.changeYDirection();
      return true;
    }
    return false;
  }

  collideWithWalls(walls) {
    if (this.hitRightWall(walls.right) || this.hitLeftWall(walls.left)) {
      this.changeXDirection();
      return true;
    } else if (this.hitTopWall(walls.top)) {
      this.changeYDirection();
      return true;
    } else if (this.hitBottomWall(walls.bottom)) {
      return true;
    }
    return false;
  }
}

export default Ball;
