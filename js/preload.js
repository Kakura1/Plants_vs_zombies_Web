// Variables para guardar sprites de imagenes
let img_bg = [];
let img_menu;
let img_gameOver;
let img_titleScreen;
let img_start;
let img_plants = [];
let img_zombies = [];
let img_projectiles;
let img_sun;
let img_heads = [];
let img_seedpacks;

// Variables para guardar sonidos y musica
let sound_tap;
let sound_seed;
let sound_noseed;
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
let sound_start;
let sound_patatapum;
let sound_leaf = [];

function preload() {
  // Carga de imagenes sprite
  img_bg.push(loadImage('assets/img/backgrounds/Garden.png')); // Jardin dia niveles 1 y 2
  img_bg.push(loadImage('assets/img/backgrounds/Garden_night.png')); // Jardin noche nivel 3
  img_menu = loadImage('assets/img/backgrounds/menu.jpg');
  img_gameOver = loadImage('assets/img/backgrounds/Game_Over.png');
  img_titleScreen = loadImage('assets/img/backgrounds/Title_Screen.png');
  img_start = loadImage('assets/img/backgrounds/Start_Text.png');
  img_plants.push(loadImage('assets/img/plants/peashooter_sprite.png')); // lanzaguisantes 0
  img_plants.push(loadImage('assets/img/plants/sunflower_sprite.png')); // girasol 1
  img_plants.push(loadImage('assets/img/plants/wallnut_sprite.png')); // nuez 2
  img_plants.push(loadImage('assets/img/plants/patatapum_sprite.png')); // patatapum 3
  img_plants.push(loadImage('assets/img/plants/repeater_sprite.png')); // repetidora 4
  img_zombies.push(loadImage('assets/img/zombies/zombies_sprite.png')); // zombis normales 0
  img_zombies.push(loadImage('assets/img/zombies/abanderado_sprite.png')); // zombi abanderado 1
  img_zombies.push(loadImage('assets/img/zombies/zombistein_sprite.png')); // Zombistein 2
  img_heads = loadImage('assets/img/zombies/heads_sprites.png'); // cono y cubeta
  img_projectiles = loadImage('assets/img/projectiles/projectiles.png');
  img_sun = loadImage('assets/img/projectiles/sun_sprite.png')
  img_seedpacks = loadImage('assets/img/projectiles/seed_packets.png');
  // Carga de sonidos y musica
  sound_tap = loadSound('assets/sounds/tap.ogg');
  sound_seed = loadSound('assets/sounds/seedlift.ogg');
  sound_noseed = loadSound('assets/sounds/buzzer.ogg');
  sound_sun = loadSound('assets/sounds/points.ogg');
  sound_win = loadSound('assets/sounds/winmusic.ogg');
  sound_loose = loadSound('assets/sounds/losemusic.ogg');
  sound_start = loadSound('assets/sounds/readysetplant.ogg');
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
  sounds_levelMusic.push(loadSound('assets/sounds/Grasswalk.ogg'));
  sounds_levelMusic.push(loadSound('assets/sounds/Moongrains.ogg'));
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
  sound_patatapum = loadSound('assets/sounds/potato_mine.ogg');
  sound_leaf.push(loadSound('assets/sounds/diamond.wav'));
  sound_leaf.push(loadSound('assets/sounds/prize.ogg'));
}