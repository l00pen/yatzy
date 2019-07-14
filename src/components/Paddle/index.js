class Paddle {
  constructor(canvas, ctx, height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.offset = 50;
    this.x = (canvas.width - width) / 2;
    this.y = (canvas.height - this.height - this.offset);
    this.canvas = canvas;
    this.ctx = ctx;

    this.leftPressed = false;
    this.rightPressed = false;

    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#72A06D";
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    if(this.rightPressed && this.x < this.canvas.width - this.width) {
      this.updateRight();
    }
    else if(this.leftPressed && this.x > 0) {
      this.updateLeft();
    }
  }

  updateLeft() {
    this.x -= 7;
  }

  updateRight() {
    this.x += 7;
  }

  keyUpHandler(e) {
    if(e.keyCode == 39) {
      this.rightPressed = false;
    }
    else if(e.keyCode == 37) {
      this.leftPressed = false;
    }
  }

  keyDownHandler(e) {
    if(e.keyCode == 39) {
      this.rightPressed = true;
    }
    else if(e.keyCode == 37) {
      this.leftPressed = true;
    }
  }

  collisionDetection(ball) {
    return (ball.x > this.x && ball.x < this.x + this.width) && (ball.y >= this.y);
  }
}

export default Paddle;
