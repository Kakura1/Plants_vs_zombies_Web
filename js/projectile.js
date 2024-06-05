class Projectile {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 10;
      this.power = 10;
      this.speed = 7;
    }
    update() {
      this.x += this.speed;
    }
    draw() {
        /*
      fill('black');
      ellipse(this.x, this.y, this.width * 2, this.height * 2);*/
      // image(img, sx, sy, sw, sh, dx, dy, dw, dh);
      image(img_projectiles, this.x - 5, this.y - 15, 28, 28, 5, 69, 28, 28)
    }
  }
  