class Zombie {
    constructor(verticalPosition, health, type, img, maxFrame, spriteWidth, spriteHeight) {
      this.x = width;
      this.y = verticalPosition;
      this.width = cellSize - cellGap * 2;
      this.height = cellSize - cellGap * 2;
      this.speed = random(0.2, 0.5);
      this.movement = this.speed;
      this.health = health;
      this.maxHealth = this.health;
      this.type = type;
      this.img = img;
      this.frameX = 0;
      this.frameY = 0;
      this.minFrame = 0;
      this.maxFrame = maxFrame;
      this.spriteWidth = spriteWidth;
      this.spriteHeight = spriteHeight;
    }
    update() {
      this.x -= this.movement;
      if (frame % 640 === 0) {
        sounds_zombisNoise[Math.floor(Math.random() * 5)].play();
      }
      if (frame % 3 === 0) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
      }
    }
    draw() {
      // image(img, sx, sy, sw, sh, dx, dy, dw, dh);
      image(this.img, this.x - 50, this.y - 65,
        this.spriteWidth, this.spriteHeight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
    }
  }