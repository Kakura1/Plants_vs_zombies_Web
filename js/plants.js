class Plant {
    constructor(x, y, health, type) {
      this.x = x - 15;
      this.y = y;
      this.width = cellWidth - (cellGap * 2);
      this.height = cellSize - (cellGap * 2);
      this.shooting = false;
      this.health = health;
      this.timer = 0;
      this.type = type;
    }
    draw() {
      fill('blue');
      rect(this.x, this.y - 20, this.width, this.height);
      fill('gold');
      textSize(30);
      textAlign(CENTER, CENTER);
      text(floor(this.health), this.x + this.width / 2, this.y + this.height / 2 - 25);
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
    }
  }