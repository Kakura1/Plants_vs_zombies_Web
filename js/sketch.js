let canvas = document.getElementsByTagName('canvas');
// Variables Globales
let cellSize = 100;
let cellWidth = 83;
let cellGap = 3;
let gameGrid = [];
let plants = [];
let zombies = [];
let numberOfSuns = 50;
let frame = 0;
let zombiesInterval = 900;
let zombiesPerLevel = 15;
let zombiesKilled = 0;
let zombiesSpawn = 0;
let gameOver = false;
let zombiePositions = [];
let projectiles = [];
let suns = [];
let controlsBar;
let currentLevel = 1;

// Preparacion de niveles, arreglos de plantas y Zombies


let level = [{
  zombiesPerLevel: 15,
  zombiesInterval: 900,
  zombies: ['comun', 'caracono', 'abanderado'],
  plants: ['lanzaguisantes', 'girasol'],
}, {
  zombiesPerLevel: 45,
  zombiesInterval: 900,
  zombies: ['comun', 'caracono', 'caracubo', 'abanderado'],
  plants: ['lanzaguisantes', 'girasol', 'nuez', 'patatapum'],
}, {
  zombiesPerLevel: 80,
  zombiesInterval: 900,
  zombies: ['comun', 'caracono', 'caracubo', 'abanderado', 'zombistein'],
  plants: ['lanzaguisantes', 'girasol', 'nuez', 'patatapum', 'repetidora'],
}];

let typePlants = [{
  type: 'lanzaguisantes',
  health: 90,
  time: 5,
  isShooter: true,
  maxFrame: 23,
  width: 80,
  height: 78,
  sunCost: 100
}, {
  type: 'girasol',
  health: 90,
  time: 5,
  isShooter: false,
  maxFrame: 25,
  width: 80,
  height: 78,
  sunCost: 50
}, {
  type: 'nuez',
  health: 1200,
  time: 20,
  isShooter: false,
  maxFrame: 25,
  width: 80,
  height: 78,
  sunCost: 50
}, {
  type: 'patatapum',
  health: 60,
  time: 10,
  isShooter: false,
  maxFrame: 25,
  width: 80,
  height: 78,
  sunCost: 25
}, {
  type: 'repetidora',
  health: 150,
  time: 10,
  isShooter: true,
  maxFrame: 25,
  width: 80,
  height: 78,
  sunCost: 200
}
];

let typeZombie = [
  {
    type: 'comun', health: 100, walkFrames: 45,
    eatFrames: 39, deathFrames: 38, width: 196,
  },
  {
    type: 'abanderado', health: 100, walkFrames: 54,
    eatFrames: 39, deathFrames: 38, width: 196
  },
  {
    type: 'caracono', health: 280, walkFrames: 45,
    eatFrames: 39, deathFrames: 38, width: 196
  },
  {
    type: 'caracubo', health: 370, walkFrames: 45,
    eatFrames: 39, deathFrames: 38, width: 196
  },
  {
    type: 'zombistein', health: 1000, walkFrames: 43,
    smashFrames: 30, deathFrames: 53, width: 250
  }];

function setup() {
  createCanvas(900, 600);
  controlsBar = { width: width, height: cellSize };
  createGrid();
  frameRate(60);
  sound_start.play();
}

let x = 0;

function draw() {
  background(220);
  fill('blue');
  rect(0, 0, controlsBar.width, controlsBar.height);
  image(img_bg[0], 0, 0, 900, 600, 98, 0, 900, 600, COVER);
  if (!sound_start.isPlaying()) {
    if (!bgmusic) {
      sounds_levelMusic[0].volume = 0.6;
      sounds_levelMusic[0].loop();
      bgmusic = true;
    }
    if (!gameOver && !winmusic) {

    }
    handleGameStatus();
    handleGameGrid();
    handlePlants();
    handleZombies();
    handleProjectiles();
    handleSuns();

  } else {
    image(img_start, 345, 260, 310, 112, 0, x * 116, 310, 112);
    if (frame % 60 === 30 && x < 3) {
      x++;
    }
  }
  frame++;
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellWidth;
    this.height = cellSize;
  }
  draw() {
    if (mouseX && mouseY && collision(this, { x: mouseX, y: mouseY, width: 0.1, height: 0.1 })) {
      /*stroke('black');
      noFill();
      rect(this.x,this.y - 25,this.width,this.height);*/
    }
  }
}

function createGrid() {
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 150; x < canvas.width; x += cellSize) {
      gameGrid.push(new Cell(x, y));
    }
  }
}

function handleGameGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}

function mousePressed() {
  let gridPositionX = floor(mouseX / cellWidth) * cellWidth + cellGap;
  let gridPositionY = floor(mouseY / cellSize) * cellSize + cellGap;
  if (gridPositionY < cellSize && gridPositionX > 150 && gridPositionY < 850) return;
  for (let i = 0; i < plants.length; i++) {
    if (plants[i].x + 15 === gridPositionX && plants[i].y === gridPositionY) return;
  }
  let plantCost = 100;
  if (numberOfSuns >= plantCost && gridPositionX > 150) {
    plants.push(new Plant(gridPositionX, gridPositionY, typePlants[0].health, typePlants[0].health, img_plants[0], 25, typePlants[0].width, typePlants[0].height, typePlants[0].isShooter));
    sound_seed.play();
    numberOfSuns -= plantCost;
  } else {
    sound_noseed.play();
  }
}

function handlePlants() {
  for (let i = 0; i < plants.length; i++) {
    plants[i].draw();
    plants[i].update();
    if (zombiePositions.indexOf(plants[i].y) !== -1) {
      plants[i].shooting = true;
    } else {
      plants[i].shooting = false;
    }
    for (let j = 0; j < zombies.length; j++) {
      if (collision(plants[i], zombies[j])) {
        zombies[j].movement = 0;
        if (zombies[j].frameY == 0) {
          zombies[j].frameX = 0;
        }
        zombies[j].frameY = 1;
        zombies[j].maxFrame = typeZombie[0].eatFrames;
        plants[i].health -= 0.5;
        if (plants[i].health % 30 === 0) {
          sounds_zombisNoise[Math.floor(Math.random() * 3) + 5].play();
        }
      }
      if (plants[i].health <= 0) {
        sounds_zombisNoise[9].play();
        plants.splice(i, 1);
        zombies[j].movement = zombies[j].speed;
        zombies[j].frameX = 0;
        zombies[j].frameY = 0;
        zombies[j].maxFrame = typeZombie[0].walkFrames;
      }
    }
  }
}

function handleZombies() {
  let r = floor(random(1, 30));
  let z = 0;
  if (r <= 20) z = 1;
  if (r > 20 && r <= 25) z = 1;
  if (r > 25 && r <= 30) z = 1;
  r = floor(random(z));
  for (let i = 0; i < zombies.length; i++) {
    zombies[i].update();
    zombies[i].draw();
    if (zombies[i].x < 0) {
      gameOver = true;
    }
    if (zombies[i].health <= 0) {
      let index = zombies.indexOf(zombies[i]);
      zombiesKilled++;
      zombiePositions.splice(zombiePositions.indexOf(zombies[i].y), 1);
      zombies.splice(index, 1);
    }
  }
  if (frame % zombiesInterval === 0 && zombiesSpawn < zombiesPerLevel) {
    let verticalPosition = floor(random(1, 6)) * cellSize + cellGap;
    zombies.push(new Zombie(verticalPosition, typeZombie[r].health, typeZombie[r].type, img_zombies[r], typeZombie[r].walkFrames, 196, 150));
    zombiesSpawn++;
    zombiePositions.push(verticalPosition);
    if (zombiesInterval > 120) zombiesInterval -= 40;
  }
}

function handleProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let projectile = projectiles[i];
    projectile.update();
    projectile.draw();

    for (let j = zombies.length - 1; j >= 0; j--) {
      let zombie = zombies[j];
      if (collision(projectile, zombie)) {
        zombie.health -= projectile.power;
        sounds_hit[floor(random() * 3)].play();
        projectiles.splice(i, 1);
        break;
      }
    }

    if (projectile.x > width + 10) {
      projectiles.splice(i, 1);
    }
  }
}

function handleSuns() {
  if (!gameOver && !winmusic) {
    if (frame % 300 === 0) {
      suns.push(new Sun());
    }
  }
  for (let i = suns.length - 1; i >= 0; i--) {
    let sun = suns[i];
    sun.update();
    sun.draw();
    if (sun.lifeTime <= 0) {
      suns.splice(i, 1);
    }
    if (mouseX && mouseY && collision(sun, { x: mouseX, y: mouseY, width: 0.1, height: 0.1 })) {
      numberOfSuns += sun.sun;
      suns.splice(i, 1);
      sound_sun.play();
    }
  }
}

function handleGameStatus() {
  seedPacks();
  if (gameOver) {
    fill('black');
    textSize(90);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    noLoop();
    sounds_levelMusic[0].stop();
    sound_loose.play();
  }
  if (zombies.length === 0 && zombiesKilled === zombiesPerLevel) {
    // Siguiente nivel
    if (!winmusic) {
      sound_win.play();
      sounds_levelMusic[0].stop();
      winmusic = true;
      switch (currentLevel) {
        case 1:
          currentLevel = 2;
          zombiesInterval = 750;
          zombiesSpawn = 0;
          zombiesPerLevel *= 3;
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }
  }
}

function collision(first, second) {
  if (first || second) {
    return !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    );
  } else {

  }
}

function windowResized() {
  let canvasPosition = canvas.getBoundingClientRect();
}

function seedPacks() {
  fill('rgb(147, 69, 28)');
  rect(2, 2, 96, 106);
  fill('rgb(112, 50, 19)');
  rect(15, 10, 70, 75);
  fill('rgba(147, 69, 28, 0.9)');
  rect(98, 2, 420, 96);
  fill('rgba(112, 50, 19, 0.9)');
  rect(108, 10, 400, 80);
  seeds[0].draw();
  seeds[0].update();
  seeds[1].draw();
  seeds[1].update();
  seeds[2].draw();
  seeds[2].update();
  seeds[3].draw();
  seeds[3].update();
  seeds[4].draw();
  seeds[4].update();
  fill('rgb(147, 69, 28)');
  ellipse(50, 50, 60, 60);
  fill('rgb(112, 50, 19)');
  ellipse(50, 50, 54, 54);
  image(img_sun, 12, 10, 80, 80, 0, 0, 141, 141);
  fill('rgb(234, 197, 141)');
  rect(15, 82, 70, 25);
  fill('black');
  textSize(25);
  textAlign(CENTER, CENTER);
  text(numberOfSuns, 50, 93);
}


let seeds = [];
seeds.push(new seedPack(108, 10, typePlants[0], 100, 3, 0));
seeds.push(new seedPack(168, 10, typePlants[1], 50, 5, 1));
seeds.push(new seedPack(228, 10, typePlants[2], 50, 20, 2));
seeds.push(new seedPack(288, 10, typePlants[3], 25, 10, 3));
seeds.push(new seedPack(348, 10, typePlants[4], 200, 10, 4));