class seedPack {
  constructor(x, y, typePlants, sunCost, timeWait, img) {
    this.x = x;
    this.y = y;
    this.typePlants = typePlants;
    this.sunCost = sunCost;
    this.timeWait = timeWait;
    this.img = img;
    this.height = 80;
    this.plant = false;
    this.select;
  }
  update() {
    if (frame % 60 === 0) {
      this.timeWait--;
    }
    if (frame % (floor(this.typePlants.time * 60 / 80)) === 0) {
      if (this.height !== 0) {
        this.height--;
      }
      if (this.plant) {
        this.height = 80;
        this.timeWait = this.typePlants.time;
      }
    }
  }
  draw() {
    image(img_seedpacks, this.x, this.y, 60, 80, 0, 0, 104, 144);
    switch (this.typePlants.type) {
      case 'lanzaguisantes':
        image(img_plants[this.img], this.x + 10, this.y + 15, 40, 39, 0, 0, 80, 78);
        break;
      case 'girasol':
        image(img_plants[this.img], this.x + 8, this.y + 15, 40, 39, 0, 0, 80, 78);
        break;
      case 'nuez':
        image(img_plants[this.img], this.x + 10, this.y + 15, 40, 39, 0, 0, 80, 78);
        break;
      case 'patatapum':
        image(img_plants[this.img], this.x + 6, this.y + 15, 40, 39, 0, 0, 80, 78);
        break;
      case 'repetidora':
        image(img_plants[this.img], this.x + 10, this.y + 15, 40, 39, 0, 0, 80, 78);
        break;
    }
    fill('black');
    textSize(15);
    textAlign(CENTER, CENTER);
    text(this.sunCost, this.x + 25, this.y + 70);
    if(numberOfSuns < this.sunCost){
      fill('rgba(0,0,0,0.8)');
      rect(this.x, this.y, 60, 80);
    }
    fill('rgba(0,0,0,0.6)');
    rect(this.x, this.y, 60, this.height);
    if (this.select){
      fill('rgba(255,255,255,0.2)');
      rect(this.x, this.y, 60, 80);
    }
  }
}
