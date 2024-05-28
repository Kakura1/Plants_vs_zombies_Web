// Variables Globales
let cellSize = 100;
let cellGap = 3;
let gameGrid = [];
let plants = [];
let zombies = [];
let numberOfSuns = 500;
let frame = 0;
let zombiesInterval = 600;
let zombiesPerLevel = 15;
let zombiesKilled = 0;
let zombiesSpawn = 0;
let gameOver = false;
let zombiePositions = [];

// Funciones principales de p5
function setup() {
  createCanvas(900, 600);
  createGrid();
  // Configurar eventos de mouse
  canvasPosition = canvas.getBoundingClientRect();
}

function draw() {
  background(220);
  fill(0, 0, 255);
  rect(0, 0, width, cellSize);  // Controls Bar
  handleGameGrid();
  handlePlants();
  handleGameStatus();
  handleZombies();
  frame++;
}

// Tablero o Game Board
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

// Plantas
class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.shooting = false;
    this.health = 100;
    this.projectiles = [];
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
}

function mousePressed() {
  let gridPositionX = floor(mouseX / cellSize) * cellSize;
  let gridPositionY = floor(mouseY / cellSize) * cellSize;
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
  for (let i = 0; i < plants.length; i++) {
    plants[i].draw();
    for(let j = 0; j < zombies.length; j++){
        if(collision(plants[i],zombies[j])){
            zombies[j].movement = 0;
            plants[i].health -= 0.5;
        }
        if(plants[i] && plants[i].health <= 0){
            plants[i].splice(i, 1);
            i--;
            zombies[j].movement = zombies[j].speed;
        }
    }
  }
}

// Zombis
class Zombie {
  constructor(verticalPosition) {
    this.x = width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.health = cellSize;
    this.speed = random(0.2, 1.6);
    this.movement = this.speed;
    this.health = 100;
    this.maxHealth = this.health;
  }
  update() {
    this.x -= this.movement;
  }
  draw() {
    fill('red');
    rect(this.x, this.y, this.width, this.health);
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
  }
  if (frame % zombiesInterval === 0 && zombiesSpawn <= zombiesPerLevel) {
    let verticalPosition = floor(random(1, 6)) * cellSize;
    zombies.push(new Zombie(verticalPosition));
    zombiesSpawn++;
    zombiePositions.push(verticalPosition);
    if (zombiesInterval > 120) zombiesInterval -= 100;
  }
}

// Utilidades
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
