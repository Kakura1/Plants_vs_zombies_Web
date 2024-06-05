class seedPack {
  constructor(x, y, typePlants, sunCost, timeWait, img) {
    this.x = x;
    this.y = y;
    this.typePlants = typePlants;
    this.sunCost = sunCost;
    this.timeWait = timeWait;
    this.img = img;
  }
  update() {
    if (frame % 60 === 0) {
      this.timeWait--;
    }
  }
  draw() {
    image(img_seedpacks, this.x, this.y, 60, 80, 0, 0, 104, 144);
    fill('black');
    image(img_plants[this.img], this.x + 10, this.y + 15, 40, 39, 0,0, 80,78)
    textSize(15);
    textAlign(CENTER, CENTER);
    text(this.sunCost, this.x + 25, this.y + 70);
  }
}
