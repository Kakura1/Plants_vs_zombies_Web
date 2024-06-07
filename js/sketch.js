let canvas = document.getElementsByTagName('canvas');
// Variables Globales
let cellSize = 100;
let cellWidth = 83;
let cellGap = 3;
let gameGrid = [];
let plants = [];
let zombies = [];
let numberOfSuns = 150;
let frame = 0;
let zombiesInterval = 900;
let zombiesPerLevel = 15;
let zombiesKilled = 0;
let zombiesSpawn = 0;
let gameOver = false;
let zombiePositions = [];
let projectiles = [];
let suns = [];
let leafs = [];
let controlsBar;
let currentLevel = 1;


let keys = [{
  keyCode: 49,
  key: '1',
}, {
  keyCode: 50,
  key: '2',
}, {
  keyCode: 51,
  key: '3',
}, {
  keyCode: 52,
  key: '4',
}, {
  keyCode: 53,
  key: '5',
}];


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
  maxFrame: 24,
  width: 80,
  height: 78,
  sunCost: 100
}, {
  type: 'girasol',
  health: 90,
  time: 5,
  isShooter: false,
  maxFrame: 24,
  width: 80,
  height: 78,
  sunCost: 50
}, {
  type: 'nuez',
  health: 1200,
  time: 20,
  isShooter: false,
  maxFrame: 15,
  width: 80,
  height: 78,
  sunCost: 50
}, {
  type: 'patatapum',
  health: 60,
  time: 10,
  isShooter: false,
  maxFrame: 35,
  width: 95,
  height: 80,
  sunCost: 25
}, {
  type: 'repetidora',
  health: 150,
  time: 10,
  isShooter: true,
  maxFrame: 24,
  width: 80,
  height: 78,
  sunCost: 200
}
];

let typeZombie = [
  {
    type: 'comun', health: 100, walkFrames: 45,
    eatFrames: 39, deathFrames: 38, width: 196,
    height: 150,
  },
  {
    type: 'abanderado', health: 100, walkFrames: 54,
    eatFrames: 39, deathFrames: 38, width: 196,
    height: 150,
  },
  {
    type: 'caracono', health: 280, walkFrames: 45,
    eatFrames: 39, deathFrames: 38, width: 196,
    height: 150,
  },
  {
    type: 'caracubo', health: 370, walkFrames: 45,
    eatFrames: 39, deathFrames: 38, width: 196,
    height: 150
  },
  {
    type: 'zombistein', health: 1000, walkFrames: 43,
    eatFrames: 30, deathFrames: 53, width: 380,
    height: 250,
  }];

function setup() {
  createCanvas(900, 600);
  controlsBar = { width: width, height: cellSize };
  createGrid();
  frameRate(60);
  sound_start.play();
}


let seeds = [];
seeds.push(new seedPack(108, 10, typePlants[0], 100, 3, 0));
seeds.push(new seedPack(168, 10, typePlants[1], 50, 5, 1));
seeds.push(new seedPack(228, 10, typePlants[2], 50, 20, 2));
seeds.push(new seedPack(288, 10, typePlants[3], 25, 10, 3));
seeds.push(new seedPack(348, 10, typePlants[4], 200, 10, 4));

let x = 0;
let n = 0;
function draw() {
  switch (currentLevel) {
    case 1:
      image(img_bg[0], 0, 0, 900, 600, 98, 0, 900, 600, COVER);
      n = 0;
      if (!sound_start.isPlaying()) {
        if (!bgmusic) {
          sounds_levelMusic[n].volume = 0.6;
          sounds_levelMusic[n].loop();
          bgmusic = true;
        }
        if (!gameOver && !winmusic) {
    
        }
        handleGameStatus();
        handlePlants();
        handleProjectiles();
        handleZombies();
        handleSuns();
        handleGameGrid();
    
      } else {
        image(img_start, 345, 260, 310, 112, 0, x * 116, 310, 112);
        if (frame % 60 === 30 && x < 3) {
          x++;
        }
        if (x === 3) {
          second();
          sound_start.stop();
        }
      }
      break;
    case 2:
      image(img_bg[0], 0, 0, 900, 600, 98, 0, 900, 600, COVER);
      n = 0;
      if (!sound_start.isPlaying()) {
        if (!bgmusic) {
          sounds_levelMusic[n].volume = 0.6;
          sounds_levelMusic[n].loop();
          bgmusic = true;
        }
        if (!gameOver && !winmusic) {
    
        }
        handleGameStatus();
        handlePlants();
        handleProjectiles();
        handleZombies();
        handleSuns();
        handleGameGrid();
    
      } else {
        image(img_start, 345, 260, 310, 112, 0, x * 116, 310, 112);
        if (frame % 60 === 30 && x < 3) {
          x++;
        }
        if (x === 3) {
          second();
          sound_start.stop();
        }
      }
      break;
    case 3:
      image(img_bg[1], 0, 0, 900, 600, 98, 0, 900, 600, COVER);
      n = 1;
      if (!sound_start.isPlaying()) {
        if (!bgmusic) {
          sounds_levelMusic[n].volume = 0.6;
          sounds_levelMusic[n].loop();
          bgmusic = true;
        }
        if (!gameOver && !winmusic) {
    
        }
        handleGameStatus();
        handlePlants();
        handleProjectiles();
        handleZombies();
        handleSuns();
        handleGameGrid();
    
      } else {
        image(img_start, 345, 260, 310, 112, 0, x * 116, 310, 112);
        if (frame % 60 === 30 && x < 3) {
          x++;
        }
        if (x === 3) {
          second();
          sound_start.stop();
        }
      }
      break;
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
      stroke('black');
      noFill();
      rect(this.x, this.y - 25, this.width, this.height);
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
let plantSelect = 6;
function mousePressed() {
  if (plantSelect != 6) {
    let gridPositionX = floor(mouseX / cellWidth) * cellWidth + cellGap;
    let gridPositionY = floor(mouseY / cellSize) * cellSize + cellGap;
    let pos = { x: gridPositionX, y: gridPositionY };
    if (gridPositionX > 108 && gridPositionX < 408 && gridPositionY > 10 && gridPositionY < 90) {
      for (let i = 0; i < seeds.length; i++) {
        if (seeds[i] && collision(pos, seeds[i])) {
          plantSelect = seeds[i].typePlants;
        }
      }
    }
    if (gridPositionY < cellSize && gridPositionX > 150 && gridPositionY < 850) return;
    for (let i = 0; i < plants.length; i++) {
      if (plants[i].x + 15 === gridPositionX && plants[i].y === gridPositionY) return;
    }
    let plantCost = typePlants[plantSelect].sunCost;
    if (numberOfSuns >= plantCost && gridPositionX > 150 && seeds[plantSelect].timeWait <= 0) {
      plants.push(new Plant(gridPositionX, gridPositionY, typePlants[plantSelect].health, typePlants[plantSelect].type, img_plants[plantSelect], typePlants[plantSelect].maxFrame, typePlants[plantSelect].width, typePlants[plantSelect].height, typePlants[plantSelect].isShooter));
      seeds[plantSelect].height = 80;
      seeds[plantSelect].timeWait = typePlants[plantSelect].time;
      sound_seed.play();
      numberOfSuns -= plantCost;
    } else {
      sound_noseed.play();
    }
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
      if (plants[i] && zombies[j] && collision(plants[i], zombies[j])) {
        if (plants[i].type === 'patatapum' && plants[i].armed == 0) {
          sound_patatapum.play();
          zombies[j].health -= 400;
          plants.splice(i, 1);
          i--;
        }
        zombies[j].movement = 0;
        if (zombies[j].frameY == 0) {
          zombies[j].frameX = 0;
        }
        zombies[j].frameY = 1;
        zombies[j].maxFrame = typeZombie[0].eatFrames;
        if (zombies[j].type === 'zombistein' && zombies[j].frameX == 20) {
          zombies[j].spriteHeight == 280;
          sounds_zombistein[0].play();
          plants.splice(i, 1);
          i--;
          zombies[j].movement = zombies[j].speed;
          zombies[j].frameX = 0;
          zombies[j].frameY = 0;
          zombies[j].maxFrame = typeZombie[0].walkFrames;
        } else if (zombies[j].type !== 'zombistein') {
          plants[i].health -= 0.5;
          if (plants[i].health % 30 === 0) {
            sounds_zombisNoise[Math.floor(Math.random() * 3) + 5].play();
          }
        }
      }
      if (plants[i] && plants[i].health <= 0 && zombies[j].type !== 'zombistein') {
        sounds_zombisNoise[9].play();
        plants.splice(i, 1);
        i--;
        zombies[j].movement = zombies[j].speed;
        zombies[j].frameX = 0;
        zombies[j].frameY = 0;
        zombies[j].maxFrame = typeZombie[0].walkFrames;
      }
    }
  }
}

let zombieSelect;
function handleZombies() {
  let z = 0;
  if (zombiesSpawn < 10){
    z = 0
  } else if (zombiesSpawn % 10 == 1) {
    z = 1
  } else if (zombiesSpawn > 10) {
    z = 2;
  } else if (zombiesSpawn > 20 && currentLevel < 1 && zombiesSpawn % 5 == 1) {
    z = 3;
    if (zombiesSpawn > 25 && currentLevel < 2 && zombiesSpawn % 28 == 1) {
      z = 4;
    } else {
      z = 3;
    }
  } else {
    z = 2;
  } 
  switch (z) {
    case 0:
      zombieSelect = 0;
      break;
    case 1:
      zombieSelect = 1;
      break;
    case 2:
      zombieSelect = 0;
      break;
    case 3:
      zombieSelect = 0;
      break;
    case 4:
      zombieSelect = 2;
      break;
  }
  for (let i = 0; i < zombies.length; i++) {
    zombies[i].update();
    zombies[i].draw();
    if (zombies[i].x < 145) {
      gameOver = true;
    }
    if (zombies[i] && zombies[i].health <= 0) {
      if (zombies[i].type === 'zombistein') {
        sounds_zombistein[1].play();
      }
      let index = zombies.indexOf(zombies[i]);
      zombiesKilled++;
      zombiePositions.splice(zombiePositions.indexOf(zombies[i].y), 1);
      zombies.splice(index, 1);
    }
  }
  if (frame % zombiesInterval === 0 && zombiesSpawn < zombiesPerLevel) {
    let verticalPosition = floor(random(1, 6)) * cellSize + cellGap;
    zombies.push(new Zombie(verticalPosition, typeZombie[z].health, typeZombie[z].type, img_zombies[zombieSelect], typeZombie[z].walkFrames, typeZombie[z].width, typeZombie[z].height));
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
      if (projectile && zombies[j] && collision(projectile, zombies[j])) {
        zombies[j].health -= projectile.power;
        if (zombies[j].type === 'caracono' && zombies[j].health > 100) {
          sounds_plastic[floor(random() * 2)].play();
        } else if (zombies[j].type === 'caracubo' && zombies[j].health > 100) {
          sounds_metal[floor(random() * 2)].play();
        } else {
          sounds_hit[floor(random() * 3)].play();
        }
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
  if (currentLevel != 3) {
    if (!gameOver && !winmusic) {
      if (frame % 900 === 0) {
        suns.push(new Sun(random(width - (cellSize * 2)) + 100, (floor(random(1, 6)) * cellSize) + 25));
      }
    }
    for (let i = suns.length - 1; i >= 0; i--) {
      let sun = suns[i];
      sun.update();
      sun.draw();
      if (sun.lifeTime <= 0) {
        suns.splice(i, 1);
      }
      if (mouseX && mouseY && sun && collision(sun, { x: mouseX, y: mouseY, width: 0.1, height: 0.1 })) {
        numberOfSuns += sun.sun;
        suns.splice(i, 1);
        sound_sun.play();
      }
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
      winmusic = true;
      sounds_levelMusic[0].stop();
      sounds_levelMusic[1].stop();      
    }
    if (!sound_win.isPlaying()){
      switch (currentLevel) {
        case 1:
          currentLevel = 2;
          zombiesInterval = 750;
          zombiesSpawn = 0;
          zombiesPerLevel *= 3;
          frame = 0;
          numberOfSuns = 100;
          bgmusic = false;
          winmusic = false;
          x = 0;
          plants.splice(0, plants.length);
          suns.splice(0,suns.length);
          sound_start.play();
          break;
        case 2:
          currentLevel = 3;
          zombiesInterval = 750;
          zombiesSpawn = 0;
          zombiesPerLevel *= 2;
          frame = 0;
          numberOfSuns = 50;
          bgmusic = false;
          winmusic = false;
          x = 0;
          plants.splice(0, plants.length);
          suns.splice(0,suns.length);
          projectiles.splice(0, projectiles.length);
          sound_start.play();
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
  handleSeeds(currentLevel);
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
  text(numberOfSuns, 50, 95);
}

function keyTyped() {
  switch (currentLevel) {
    case 1:
      switch (key) {
        case keys[0].key:
          plantSelect = 0;
          seeds[0].select = true;
          seeds[1].select = false;
          sound_tap.play();
          break;
        case keys[1].key:
          plantSelect = 1;
          seeds[0].select = false;
          seeds[1].select = true;
          sound_tap.play();
          break;
      }
      break;
    case 2:
      switch (key) {
        case keys[0].key:
          plantSelect = 0;
          seeds[0].select = true;
          seeds[1].select = false;
          seeds[2].select = false;
          seeds[3].select = false;
          sound_tap.play();
          break;
        case keys[1].key:
          plantSelect = 1;
          seeds[0].select = false;
          seeds[1].select = true;
          seeds[2].select = false;
          seeds[3].select = false;
          sound_tap.play();
          break;
        case keys[2].key:
          plantSelect = 2;
          seeds[0].select = false;
          seeds[1].select = false;
          seeds[2].select = true;
          seeds[3].select = false;
          sound_tap.play();
          break;
        case keys[3].key:
          plantSelect = 3;
          seeds[0].select = false;
          seeds[1].select = false;
          seeds[2].select = false;
          seeds[3].select = true;
          sound_tap.play();
          break;
      }
      break;
    case 3:
      switch (key) {
        case keys[0].key:
          plantSelect = 0;
          seeds[0].select = true;
          seeds[1].select = false;
          seeds[2].select = false;
          seeds[3].select = false;
          seeds[4].select = false;
          sound_tap.play();
          break;
        case keys[1].key:
          plantSelect = 1;
          seeds[0].select = false;
          seeds[1].select = true;
          seeds[2].select = false;
          seeds[3].select = false;
          seeds[4].select = false;
          sound_tap.play();
          break;
        case keys[2].key:
          plantSelect = 2;
          seeds[0].select = false;
          seeds[1].select = false;
          seeds[2].select = true;
          seeds[3].select = false;
          seeds[4].select = false;
          sound_tap.play();
          break;
        case keys[3].key:
          plantSelect = 3;
          seeds[0].select = false;
          seeds[1].select = false;
          seeds[2].select = false;
          seeds[3].select = true;
          seeds[4].select = false;
          sound_tap.play();
          break;
        case keys[4].key:
          plantSelect = 4;
          seeds[0].select = false;
          seeds[1].select = false;
          seeds[2].select = false;
          seeds[3].select = false;
          seeds[4].select = true;
          sound_tap.play();
          break;
      }
      break;
  }
}

function handleSeeds(currentLevel) {
  if (currentLevel == 1) {
    seeds[0].draw();
    seeds[0].update();
    seeds[1].draw();
    seeds[1].update();
  } else if (currentLevel == 2) {
    seeds[0].draw();
    seeds[0].update();
    seeds[1].draw();
    seeds[1].update();
    seeds[2].draw();
    seeds[2].update();
    seeds[3].draw();
    seeds[3].update();
  } else if (currentLevel == 3) {
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
  }
}