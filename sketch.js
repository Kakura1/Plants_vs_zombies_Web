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
let cellWidth = 83;
let cellGap = 3;
let gameGrid = [];
let plants = [];
let zombies = [];
let numberOfSuns = 500;
let frame = 0;
let zombiesInterval = 900;
let zombiesPerLevel = 1;
let zombiesKilled = 0;
let zombiesSpawn = 0;
let gameOver = false;
let zombiePositions = [];
let projectiles = [];
let suns = [];
let controlsBar;
let typePlants = [];
let level = [];
let currentLevel = 1;

// Preparacion de niveles, arreglos de plantas y Zombies
level.push({
  zombiesPerLevel: 15,
  zombiesInterval: 900,
  zombies: ['comun', 'caracono', 'abanderado'],
  plants: ['lanzaguisantes', 'girasol'],
});
level.push({
  zombiesPerLevel: 45,
  zombiesInterval: 900,
  zombies: ['comun', 'caracono', 'caracubo', 'abanderado'],
  plants: ['lanzaguisantes', 'girasol', 'nuez', 'patatapum'],
});
level.push({
  zombiesPerLevel: 80,
  zombiesInterval: 900,
  zombies: ['comun', 'caracono', 'caracubo', 'abanderado', 'zombistein'],
  plants: ['lanzaguisantes', 'girasol', 'nuez', 'patatapum', 'repetidora'],
});
typePlants.push({
  type: 'lanzaguisantes',
  health: 90,
  time: 5,
  isShooter: true,
});
typePlants.push({
  type: 'girasol',
  health: 90,
  time: 5,
});
typePlants.push({
  type: 'nuez',
  health: 1200,
  time: 20,
});
typePlants.push({
  type: 'patatapum',
  health: 60,
  time: 10,
});
typePlants.push({
  type: 'repetidora',
  health: 150,
  time: 10,
  isShooter: true,
});

// Variables para guardar sprites de imagenes
let img_bg = [];
let img_menu;
let img_gameOver;
let img_titleScreen;
let img_plants = [];
let img_zombies = [];
let img_projectiles = [];
let img_sun;
let img_heads = [];

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
let sounds_plantsAtack = [];
let bgmusic = false;
let winmusic = false;

function preload() {
  // Carga de imagenes sprite
  img_bg.push(loadImage('assets/img/backgrounds/Garden.png'));
  img_bg.push(loadImage('assets/img/backgrounds/Garden_night.png'));
  img_menu = loadImage('assets/img/backgrounds/menu.jpg');
  img_gameOver = loadImage('assets/img/backgrounds/Game_Over.png');
  img_titleScreen = loadImage('assets/img/backgrounds/Title_Screen.png');
  img_plants.push(loadImage('assets/img/plants/peashooter_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/sunflower_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/wallnut_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/patatapum_sprite.png'));
  img_plants.push(loadImage('assets/img/plants/repeater_sprite.png'));
  img_zombies.push(loadImage('assets/img/zombies/zombistein_walk_sprite.png')); // Zombistein 0
  img_zombies.push(loadImage('assets/img/zombies/zombistein_smash_sprite.png')); // Zombistein 1
  img_zombies.push(loadImage('assets/img/zombies/zombistein_death_sprite.png')); // Zombistein 2
  img_zombies.push(loadImage('assets/img/zombies/zombies_walk_sprite.png')); // zombis normales caminando 3
  img_zombies.push(loadImage('assets/img/zombies/zombies_eating_sprite.png')); // zombis comiendo 4
  img_zombies.push(loadImage('assets/img/zombies/zombies_death_sprite.png')); // zombis muertos 5
  img_zombies.push(loadImage('assets/img/zombies/abanderado_walk_sprite.png')); // zombi abanderado caminando 6
  img_zombies.push(loadImage('assets/img/zombies/abanderado_eating_sprite.png')); // zombi abanderado comiendo 7
  img_zombies.push(loadImage('assets/img/zombies/abanderado_death_sprite.png')); // zombi abanderado muerto 8
  img_heads = loadImage('assets/img/zombies/heads_sprites.png');
  // Carga de sonidos y musica
  sound_tap = loadSound('assets/sounds/tap.ogg');
  sound_seed = loadSound('assets/sounds/seedlift.ogg');
  sound_sun = loadSound('assets/sounds/points.ogg');
  sound_win = loadSound('assets/sounds/winmusic.ogg');
  sound_loose = loadSound('assets/sounds/losemusic.ogg');
  sound_inicialWave = loadSound('assets/sounds/awooga.ogg');
  sound_finalWave = loadSound('assets/sounds/finalwave.ogg');
  sounds_metal.push(loadSound('assets/sounds/shieldhit.ogg'));
  sounds_metal.push(loadSound('assets/sounds/shieldhit2.ogg'));
  sounds_plastic.push(loadSound('assets/sounds/plastichit.ogg'));
  sounds_plastic.push(loadSound('assets/sounds/plastichit2.ogg'));
  sounds_hit.push(loadSound('assets/sounds/splat.ogg'));
  sounds_hit.push(loadSound('assets/sounds/splat2.ogg'));
  sounds_hit.push(loadSound('assets/sounds/splat3.ogg'));
  sounds_zombistein.push(loadSound('assets/sounds/gargantuar_thump.ogg'));
  sounds_zombistein.push(loadSound('assets/sounds/gargantudeath.ogg'));
  sounds_levelMusic.push(loadSound('assets/sounds/Grasswalk.mp3'));
  sounds_levelMusic.push(loadSound('assets/sounds/Moongrains.mp3'));
  sounds_zombisNoise.push(loadSound('assets/sounds/groan.ogg')); // gruñido 0
  sounds_zombisNoise.push(loadSound('assets/sounds/groan2.ogg')); // gruñido 1
  sounds_zombisNoise.push(loadSound('assets/sounds/groan3.ogg')); // gruñido 2
  sounds_zombisNoise.push(loadSound('assets/sounds/groan4.ogg')); // gruñido 3
  sounds_zombisNoise.push(loadSound('assets/sounds/groan5.ogg')); // gruñido 4
  sounds_zombisNoise.push(loadSound('assets/sounds/groan6.ogg')); // gruñido 5
  sounds_zombisNoise.push(loadSound('assets/sounds/chomp.ogg')); // comer 6
  sounds_zombisNoise.push(loadSound('assets/sounds/chomp2.ogg')); // comer 7 
  sounds_zombisNoise.push(loadSound('assets/sounds/chompsoft.ogg')); // comer 8
  sounds_zombisNoise.push(loadSound('assets/sounds/gulp.ogg')); // tragar 9
  sounds_zombisNoise.push(loadSound('assets/sounds/zombie_falling_1.ogg')); // muerto 10
  sounds_zombisNoise.push(loadSound('assets/sounds/zombie_falling_1.ogg')); // muerto 11
  sounds_plantsAtack.push(loadSound('assets/sounds/throw.ogg'));
  sounds_plantsAtack.push(loadSound('assets/sounds/throw2.ogg'));
}

function setup() {
  createCanvas(900, 600);
  controlsBar = { width: width, height: cellSize };
  createGrid();
  frameRate(100);
}

function draw() {
  background(220);
  fill('blue');
  rect(0, 0, controlsBar.width, controlsBar.height);
  image(img_bg[0], 0, 0, 900, 600, 98, 0, 900, 600, COVER);
  if (!bgmusic) {
    sounds_levelMusic[0].volume = 0.6;
    sounds_levelMusic[0].loop();
    bgmusic = true;
  }
  if (!gameOver && !winmusic) {
    handleZombies();
  }
  handleGameGrid();
  handlePlants();
  handleProjectiles();
  handleSuns();
  handleGameStatus();
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

    }
  }
}

function createGrid() {
  for (let y = cellSize; y < height; y += cellSize) {
    for (let x = 0; x < 746; x += cellWidth) {
      gameGrid.push(new Cell(x + 150, y - 20));
    }
  }
}

function handleGameGrid() {
  for (let cell of gameGrid) {
    cell.draw();
  }
}

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

function mousePressed() {
  let gridPositionX = floor(mouseX / cellWidth) * cellWidth + cellGap;
  let gridPositionY = floor(mouseY / cellSize) * cellSize + cellGap;
  if (gridPositionY < cellSize) return;
  for (let i = 0; i < plants.length; i++) {
    if (plants[i].x + 15 === gridPositionX && plants[i].y === gridPositionY) return;
  }
  let plantCost = 100;
  if (numberOfSuns >= plantCost) {
    plants.push(new Plant(gridPositionX, gridPositionY, typePlants[1].health, typePlants[1].health));
    sound_seed.play();
    numberOfSuns -= plantCost;
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
        plants[i].health -= 0.5;
        if (plants[i].health % 30 === 0) {
          sounds_zombisNoise[Math.floor(Math.random() * 3) + 5].play();
        }
      }
      if (plants[i].health <= 0) {
        sounds_zombisNoise[9].play();
        plants.splice(i, 1);
        zombies[j].movement = zombies[j].speed;
      }
    }
  }
}

class Zombie {
  constructor(verticalPosition, health, type) {
    this.x = width;
    this.y = verticalPosition;
    this.width = cellSize - cellGap * 2;
    this.height = cellSize - cellGap * 2;
    this.speed = random(0.2, 0.8);
    this.movement = this.speed;
    this.health = health;
    this.maxHealth = this.health;
    this.type = type;
  }
  update() {
    this.x -= this.movement;
  }
  draw() {
    fill('red');
    rect(this.x, this.y - 25, this.width, this.height);
    fill('black');
    textSize(30);
    textAlign(CENTER, CENTER);
    text(floor(this.health), this.x + this.width / 2, this.y);
  }
}

function handleZombies() {
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
    zombies.push(new Zombie(verticalPosition, 100, 'comun'));
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
        sounds_hit[Math.floor(Math.random() * 3)].play();
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
    this.x = random(width - (cellSize * 2)) + 100;
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
  if (!gameOver && !winmusic) {
    if (frame % 200 === 0) {
      suns.push(new Sun());
    }
  }
  for (let i = suns.length - 1; i >= 0; i--) {
    let sun = suns[i];
    sun.draw();
    if (mouseX && mouseY && collision(sun, { x: mouseX, y: mouseY, width: 0.1, height: 0.1 })) {
      numberOfSuns += sun.sun;
      suns.splice(i, 1);
      sound_sun.play();
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
