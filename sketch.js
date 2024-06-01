/*
Zombi: Son los zombies básicos en el juego. Éstos son enemigos débiles y fáciles de matar.
Zombi caracono: Este zombie lleva un cono de tránsito en la cabeza, lo cual lo hace el doble de resistente que un zombi básico.
Zombi caracubo: Este zombie posee un cubo en la cabeza que aumenta considerablemente su resistencia.
Zombistein: Es uno de los zombis más fuertes en el juego. Este zombie aplasta las plantas en lugar de comerlas.
*/
/*
Lanzaguisantes: Es la primera planta de ataque del juego. 
Su costo son 100 soles y dispara guisantes cada 1.5 segundos. 
Su tiempo de recarga es de 5 seg, mientras que la dureza es de 3 mordiscos.
Girasol: Es un elemento esencial para la producción de sol. 
El costo de soles es de 50 y 
su tiempo de recarga es de 5 segundos y su dureza es de 3 mordiscos.
Nuez: Tiene una cáscara muy dura y puede proteger a otras plantas. 
Su coste en soles es de 50 y 
su tiempo de recarga en 20 seg y su dureza es de 40 mordiscos.
Patatapum: Es una planta explosiva. 
Una vez plantada, requiere de 15 segundos para estar activa. 
Su costo es de 25 soles, mientras que su tiempo de recarga es de 10 seg y 
su dureza es de 2 mordiscos, siempre y cuando no esté activa, 
de lo contrario al acercarse un zombie explotaría.
Repetidora: 
Es una planta que dispara dos guisantes a la vez y su velocidad de disparo es más rápida que los lanzaguisantes. 
Su tiempo de recarga es de 10 seg, mientras que su costo es de 200 soles y su dureza es de 5 mordiscos.

*/
// Variables Globales
let cellSize = 100;
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
// Variables para guardar sprites de imagenes
let img_bg;
let img_menu;
let img_gameOver;
let img_titleScreen;
let img_plants = [];
let img_zombies = [];
let img_projectiles = [];
let img_sun;

// Variables para guardar sonidos y musica
let sound_tap;
let sound_seed;
let sound_sun;
let sound_win;
let sound_loose;
let sound_inicialWave;
let sound_finalWave;
let sounds_metal = [];
let sounds_plastic = [];
let sounds_hit = [];
let sounds_zombistein = [];
let sounds_levelMusic = [];
let sounds_zombisNoise = [];

function preload() {
  // Carga de imagenes sprite
  img_bg = loadImage('assets/img/backgrounds/Garden.png');
  img_menu = loadImage('assets/img/backgrounds/menu.jpg');
  img_gameOver = loadImage('assets/img/backgrounds/Game_Over.png');
  img_titleScreen = loadImage('assets/img/backgrounds/Title_Screen.png');
  img_plants.push(loadImage('assets/img/plants/peashooter_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/sunflower_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/wallnut_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/patatapum_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/repeater_sprite.png'));
  img_zombies.push(loadImage('assets/img/zombies/abanderado_sprite.png'));
  img_zombies.push(loadImage('assets/img/zombies/zombies_sprite.png'));
  img_zombies.push(loadImage('assets/img/zombies/zombistein_sprite.png'));
  // Carga de sonidos y musica
  sound_tap = loadSound('assets/sounds/tap.ogg');
  sound_seed = loadSound('assets/sounds/');
  sound_sun = loadSound('assets/sounds/');
  sound_win = loadSound('assets/sounds/');
  sound_loose = loadSound('assets/sounds/');
  sound_inicialWave = loadSound('assets/sounds/awooga.ogg');
  sound_finalWave = loadSound('assets/sounds/finalwave.ogg');
  sounds_metal.push(loadSound('assets/sounds/'));  
  sounds_metal.push(loadSound('assets/sounds/'));  
  sounds_plastic.push(loadSound('assets/sounds/'));
  sounds_plastic.push(loadSound('assets/sounds/'));
  sounds_hit.push(loadSound('assets/sounds/splat.ogg'));
  sounds_hit.push(loadSound('assets/sounds/splat2.ogg'));
  sounds_hit.push(loadSound('assets/sounds/splat3.ogg'));
  sounds_zombistein.push(loadSound('assets/sounds/gargantuar_thump.ogg'));
  sounds_zombistein.push(loadSound('assets/sounds/gargantudeath.ogg'));
  sounds_levelMusic.push(loadSound('assets/sounds/Grasswalk.mp3'));
  sounds_levelMusic.push(loadSound('assets/sounds/Moongrains.mp3'));
  sounds_zombisNoise.push(loadSound('assets/sounds/groan.ogg'));
  sounds_zombisNoise.push(loadSound('assets/sounds/groan2.ogg'));
  sounds_zombisNoise.push(loadSound('assets/sounds/groan3.ogg'));
  sounds_zombisNoise.push(loadSound('assets/sounds/groan4.ogg'));
  sounds_zombisNoise.push(loadSound('assets/sounds/groan5.ogg'));
  sounds_zombisNoise.push(loadSound('assets/sounds/groan6.ogg'));
  sounds_zombisNoise.push(loadSound('assets/sounds/gulp.ogg'));
}

function setup() {
  createCanvas(900, 600);
  controlsBar = { width: width, height: cellSize };
  createGrid();
}

function draw() {
  background(220);
  fill('blue');
  rect(0, 0, controlsBar.width, controlsBar.height);
  handleGameGrid();
  handlePlants();
  handleZombies();
  handleProjectiles();
  handleSuns();
  handleGameStatus();
  frame++;
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw() {
    if (mouseX && mouseY && collision(this, { x: mouseX, y: mouseY, width: 0.1, height: 0.1 })) {
      stroke('black');
      noFill();
      rect(this.x, this.y, this.width, this.height);
    }
  }
}

function createGrid() {
  for (let y = cellSize; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      gameGrid.push(new Cell(x, y));
    }
  }
}

function handleGameGrid() {
  for (let cell of gameGrid) {
    cell.draw();
  }
}

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize - (cellGap * 2);
    this.height = cellSize - (cellGap * 2);
    this.shooting = false;
    this.health = 100;
    this.timer = 0;
  }
  draw() {
    fill('blue');
    rect(this.x, this.y, this.width, this.height);
    fill('gold');
    textSize(30);
    textAlign(CENTER, CENTER);
    text(floor(this.health), this.x + this.width / 2, this.y + this.height / 2);
  }
  update() {
    if (this.shooting) {
      this.timer++;
      if (this.timer % 30 === 0) {
        projectiles.push(new Projectile(this.x + 70, this.y + 25));
      }
    } else {
      this.timer = 0;
    }
  }
}

function mousePressed() {
  let gridPositionX = floor(mouseX / cellSize) * cellSize + cellGap;
  let gridPositionY = floor(mouseY / cellSize) * cellSize + cellGap;
  if (gridPositionY < cellSize) return;
  for (let plant of plants) {
    if (plant.x === gridPositionX && plant.y === gridPositionY) return;
  }
  let plantCost = 100;
  if (numberOfSuns >= plantCost) {
    plants.push(new Plant(gridPositionX, gridPositionY));
    numberOfSuns -= plantCost;
  }
}

function handlePlants() {
  for (let plant of plants) {
    plant.draw();
    plant.update();
    if (zombiePositions.indexOf(plant.y) !== -1) {
      plant.shooting = true;
    } else {
      plant.shooting = false;
    }
    for (let zombie of zombies) {
      if (collision(plant, zombie)) {
        zombie.movement = 0;
        plant.health -= 0.5;
      }
      if (plant.health <= 0) {
        plants.splice(plants.indexOf(plant), 1);
        zombie.movement = zombie.speed;
      }
    }
  }
}

class Zombie {
  constructor(verticalPosition) {
    this.x = width;
    this.y = verticalPosition;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.speed = random(0.2, 0.6);
    this.movement = this.speed;
    this.health = 100;
    this.maxHealth = this.health;
  }
  update() {
    this.x -= this.movement;
  }
  draw() {
    fill('red');
    rect(this.x, this.y, this.width, this.height);
    fill('black');
    textSize(30);
    textAlign(CENTER, CENTER);
    text(floor(this.health), this.x + this.width / 2, this.y + this.height / 2);
  }
}

function handleZombies() {
  for (let zombie of zombies) {
    zombie.update();
    zombie.draw();
    if (zombie.x < -cellSize) {
      gameOver = true;
    }
    if (zombie.health <= 0) {
      let index = zombies.indexOf(zombie);
      zombies.splice(index, 1);
      zombiesKilled++;
      zombiePositions.splice(zombiePositions.indexOf(zombie.y), 1);
    }
  }
  if (frame % zombiesInterval === 0 && zombiesSpawn < zombiesPerLevel) {
    let verticalPosition = floor(random(1, 6)) * cellSize + cellGap;
    zombies.push(new Zombie(verticalPosition));
    zombiesSpawn++;
    zombiePositions.push(verticalPosition);
    if (zombiesInterval > 120) zombiesInterval -= 40;
  }
}

class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.power = 10;
    this.speed = 7;
  }
  update() {
    this.x += this.speed;
  }
  draw() {
    fill('black');
    ellipse(this.x, this.y, this.width * 2, this.height * 2);
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
        projectiles.splice(i, 1);
        break;
      }
    }

    if (projectile.x > width + 10) {
      projectiles.splice(i, 1);
    }
  }
}

class Sun {
  constructor() {
    this.x = random(width - cellSize);
    this.y = (floor(random(1, 6)) * cellSize) + 25;
    this.width = cellSize * 0.4;
    this.height = cellSize * 0.4;
    this.sun = random([25, 50]);
  }
  draw() {
    fill('yellow');
    rect(this.x, this.y, this.width, this.height);
    fill('black');
    textSize(30);
    textAlign(CENTER, CENTER);
    text(this.sun, this.x + this.width / 2, this.y + this.height / 2);
  }
}

function handleSuns() {
  if (frame % 200 === 0) {
    suns.push(new Sun());
  }
  for (let i = suns.length - 1; i >= 0; i--) {
    let sun = suns[i];
    sun.draw();
    if (mouseX && mouseY && collision(sun, { x: mouseX, y: mouseY, width: 0.1, height: 0.1 })) {
      numberOfSuns += sun.sun;
      suns.splice(i, 1);
    }
  }
}

function handleGameStatus() {
  fill('gold');
  ellipse(50, 35, 40, 40);
  fill('rgb(234, 197, 141)');
  rect(15, 60, 70, 25);
  fill('black');
  textSize(25);
  textAlign(LEFT, CENTER);
  text(numberOfSuns, 30, 72);
  if (gameOver) {
    fill('black');
    textSize(90);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    noLoop();
  }
  if (zombies.length === 0 && zombiesKilled === zombiesPerLevel) {
    // Siguiente nivel
    console.log("Ganaste, pasa al siguiente nivel");
  }
}

function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function windowResized() {
  let canvasPosition = canvas.getBoundingClientRect();
}
