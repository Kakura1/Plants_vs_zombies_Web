class Leaf {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 10;
      this.power = 10;
      this.speed = 7;
      this.lifeTime = 200;
    }
    update(){
        if(frame % 4 == 0){
            this.lifeTime--;
        }
    }
    draw() {
      image(img_projectiles, this.x - 5, this.y - 15, 40, 40, 5, 5, 38, 38);
    }
  }