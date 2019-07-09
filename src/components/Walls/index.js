class Walls {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.left = 0;
    this.top = 0;
    this.bottom = this.canvas.height;
    this.right = this.canvas.width;
  }
}

export default Walls;
