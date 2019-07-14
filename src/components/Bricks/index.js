const colors = [
  "#32DC20",
  "#A5D27A",
  "#E82265",
]

class Brick {
  constructor(column, row) {
    this.height = 20;
    this.width = 75;
    this.padding = 10;
    this.offsetTop = 50;
    this.offsetLeft = 120;
    this.status = 1;

    this.x = (column * (this.width + this.padding)) + this.offsetLeft;
    this.y = (row * (this.height + this.padding)) + this.offsetTop;
  }
}

class Bricks {
  constructor(canvas, ctx, radius = 10) {
    this.canvas = canvas;
    this.ctx = ctx;

    var brickRowCount = 3;
    var brickColumnCount = 5;

    this.bricks = [];
    for(var c = 0; c < brickColumnCount; c++) {
        this.bricks[c] = [];
        for(var r = 0; r < brickRowCount; r++) {
            this.bricks[c][r] = new Brick(c, r);
        }
    }
  }

  draw(x, y) {
    this.bricks.map(brRow => brRow.map((brick, i) => {
      if(brick.status == 1) {
        this.ctx.beginPath();
        this.ctx.rect(brick.x, brick.y, brick.width, brick.height);
        this.ctx.fillStyle = colors[i];
        this.ctx.fill();
        this.ctx.closePath();
      }
    }));
  }

  collisionDetection(ball) {
    let foundCollision = false;
    this.bricks.map(brRow => brRow.map((b) => {
      if(b.status == 1) {
        if(ball.x > b.x && ball.x < b.x+b.width && ball.y > b.y && ball.y < b.y+b.height) {
          b.status = 0;
          foundCollision = true;
        }
      }
    }));
    return foundCollision;
  }

  allStatusIsZero() {
    let allStatusIsZero = true;
    this.bricks.map(brRow => brRow.map((b) => {
      if(b.status == 1) {
        allStatusIsZero = false;
      }
    }));
    return allStatusIsZero;
  }
}

export default Bricks;
