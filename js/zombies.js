class Zombie {
  constructor(verticalPosition, health, type, img, maxFrame, spriteWidth, spriteHeight) {
    this.x = width;
    this.y = verticalPosition;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.speed = random(0.2, 0.3);
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
    this.headWidth;
    this.headHeight;
    this.headX;
    this.headY;
    this.hasP = floor(random(1,10));
  }
  update() {
    this.x -= this.movement;
    if (frame % 640 === 0) {
      sounds_zombisNoise[Math.floor(Math.random() * 5)].play();
    }
    if (this.type === 'zombistein'){
      if (frame % 3 === 0) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
      }
    } else {
      if (frame % 3 === 0) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
      }
    }
  }
  draw() {
    // image(img, sx, sy, sw, sh, dx, dy, dw, dh);
    switch (this.type) {
      case 'comun':
        image(this.img, this.x - 50, this.y - 65,
          this.spriteWidth, this.spriteHeight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        break;
      case 'abanderado':
        this.minFrame = 4;
        image(this.img, this.x - 50, this.y - 80,
          this.spriteWidth, this.spriteHeight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        break;
      case 'caracono':
        switch (this.health) {
          case 280:
            this.headWidth = 59;
            this.headHeight = 56;
            this.headX = 0;
            this.headY = 2;
            break;
          case 220:
            this.headWidth = 59;
            this.headHeight = 56;
            this.headX = 60;
            this.headY = 2;
            break;
          case 160:
            this.headWidth = 59;
            this.headHeight = 56;
            this.headX = 120;
            this.headY = 2;
            break;
        }
        image(this.img, this.x - 50, this.y - 65,
          this.spriteWidth, this.spriteHeight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        if (this.health > 100) {
          if (this.frameY == 0){
            image(img_heads, this.x + 20, this.y - 80, this.headWidth * 0.8, this.headHeight * 0.8, this.headX, this.headY, this.headWidth, this.headHeight);
          } else {
            image(img_heads, this.x, this.y - 73, this.headWidth * 0.8, this.headHeight * 0.8, this.headX, this.headY, this.headWidth, this.headHeight);
          }
        }
        break;
      case 'caracubo':
        switch (this.health) {
          case 370:
            this.headWidth = 62;
            this.headHeight = 66;
            this.headX = 0;
            this.headY = 67;
            break;
          case 280:
            this.headWidth = 62;
            this.headHeight = 66;
            this.headX = 63;
            this.headY = 67;
            break;
          case 190:
            this.headWidth = 62;
            this.headHeight = 66;
            this.headX = 127;
            this.headY = 67;
            break;
        }
        image(this.img, this.x - 50, this.y - 65,
          this.spriteWidth, this.spriteHeight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
        if (this.health > 100) {
          if (this.frameY == 0){
            image(img_heads, this.x + 20, this.y - 70, this.headWidth * 0.8, this.headHeight * 0.8, this.headX, this.headY, this.headWidth, this.headHeight);
          } else {
            image(img_heads, this.x, this.y - 63, this.headWidth * 0.8, this.headHeight * 0.8, this.headX, this.headY, this.headWidth, this.headHeight);
          }
        }
        break;
        case 'zombistein':
          if (this.frameY == 1){
            image(this.img, this.x - 80, this.y - 180,
              this.spriteWidth, this.spriteHeight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
          } else {
            image(this.img, this.x - 80, this.y - 150,
            this.spriteWidth, this.spriteHeight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight);
          }
          break;
    }

  }
}
