const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  groundH: 1000,
  characterHeight: 350,
  grounLevel: 80,
  padding: 300,
  spriteScale: 0.5,
  anchorPoint: 0.5,
  gravity: 1000,
  throwSpeed: 1300,
  zoomLevel: 1,
  state: {
    preload,
    create,
  },
};

let enemy = 0;
let enemyHealth = 100;
let playerHealth = 100;
let player = 0;
let playerWeapon = 0;
let enemyWeapon = 0;
let playerAiming = false; // is not aiming
let playerShooting = false; // is not shooting

const game = new Phaser.Game(config);

function preload() {
  // Resp
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  this.load.image('logo', 'assets/UI/logo.png');
  this.add.plugin(PhaserSpine.SpinePlugin);

  this.state.add('preloadScene', preloadScene);
  this.state.add('mainScene', mainScene);
}

function create() {
  this.state.start('preloadScene');
}
