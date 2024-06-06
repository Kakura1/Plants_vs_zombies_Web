class Sun {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = cellSize * 0.8;
      this.height = cellSize * 0.8;
      this.sun = random([25, 50]);
      this.frameX = 0;
      this.frameY = 0;
      this.minFrame = 0;
      this.maxFrame = 13;
      this.lifeTime = 50;
    }
    update() {
      if (frame % 5 === 0) {
        if (this.frameX < this.maxFrame) {
            this.frameX++; 
            this.lifeTime--;
        }
        else {
            this.frameX = this.minFrame;
        }
      }
    }
    draw() {
      image(img_sun, this.x, this.y, this.width, this.height, this.frameX * 139, 0, 139, 121);
    }
  }