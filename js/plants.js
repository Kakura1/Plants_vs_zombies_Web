class Plant {
    constructor(x, y, health, type, img, maxFrame, spriteWidth, spriteHeight, shooter) {
      this.x = x - 15;
      this.y = y;
      this.width = cellWidth - (cellGap * 2);
      this.height = cellSize - (cellGap * 2);
      this.shooting = false;
      this.health = health;
      this.timer = 0;
      this.type = type;
      this.img = img;
      this.frameX = 0;
      this.frameY = 0;
      this.minFrame = 0;
      this.maxFrame = maxFrame;
      this.spriteWidth = spriteWidth;
      this.spriteHeight = spriteHeight;
      this.shooter = shooter;
    }
    draw() {
      // image(img, sx, sy, sw, sh, dx, dy, dw, dh);
      image(this.img, this.x, this.y - 25, this.spriteWidth, this.spriteHeight, 
        this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
        this.spriteWidth, this.spriteHeight)
    }
    update() {
      if (this.shooting) {
        this.timer++;
        if (this.timer % 100 === 0) {
          projectiles.push(new Projectile(this.x + 70, this.y));
          sounds_plantsAtack[Math.floor(Math.random() * 2)].play();
        }
      } else {
        this.timer = 0;
      }
      if (frame % 3 === 0) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
      }
    }
  }