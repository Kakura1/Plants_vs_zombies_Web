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
    this.armed = 900;
  }
  draw() {
    // image(img, sx, sy, sw, sh, dx, dy, dw, dh);
    if (this.type === 'patatapum'){
      image(this.img, this.x - 10, this.y - 25, this.spriteWidth * 0.8, this.spriteHeight * 0.8,
        this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
        this.spriteWidth, this.spriteHeight);
    } else {
      image(this.img, this.x, this.y - 25, this.spriteWidth, this.spriteHeight,
        this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
        this.spriteWidth, this.spriteHeight);
    }
  }
  update() {
    if (this.shooter) {
      switch (this.type){
        case 'lanzaguisantes':
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
          break;
        case 'repetidora':
          if (this.shooting) {
            this.timer++;
            if (this.timer % 100 === 0) {
              projectiles.push(new Projectile(this.x + 70, this.y));
              sounds_plantsAtack[Math.floor(Math.random() * 2)].play();
            }
            if (this.timer % 100 === 20) {
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
          break;
      }
    } else {
      switch(this.type){
        case 'girasol':
          this.timer++;
          if (this.timer % 400 === 0) {
            suns.push(new Sun(this.x, this.y));
          }
          for (let i = suns.length - 1; i >= 0; i--) {
            suns[i].update();
            suns[i].draw();
            if (suns[i].lifeTime < 0) {
              suns.splice(i, 1);
            }
            if (mouseX && mouseY && suns[i] && collision(suns[i], { x: mouseX, y: mouseY, width: 0.1, height: 0.1 })) {
              numberOfSuns += suns[i].sun;
              suns.splice(i, 1);
              sound_sun.play();
            }
          }
          if (frame % 3 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
          }
          break;
        case 'nuez':
          if (frame % 3 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
          }
          break;
        case 'patatapum':
          this.minFrame = 21;
          if(this.armed > 0){
            this.armed--;
          }
          if (frame % 3 === 0 && this.armed === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
          }
          break;
      }
    }

  }
}