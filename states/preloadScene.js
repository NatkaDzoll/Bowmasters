const preloadScene = {
  preload() {
    this.logo = this.add.image(config.width / 2, config.height / 3, 'logo');
    this.logo.anchor.setTo(config.anchorPoint);

    // Preload state
    this.progressBox = this.add.graphics();
    this.progressBox.beginFill(0x994eda);
    this.progressBox.drawRoundedRect(config.width / 4, config.height / 1.5, config.width / 2 + 20, 70, 35);

    this.progressBarGR = this.add.graphics();
    this.progressBarGR.beginFill(0xff6100);
    this.progressBarGR.drawRoundedRect(config.width / 4 + 10, config.height / 1.5 + 10, config.width / 2, 50, 25);

    this.progressBar = this.add.sprite(config.width / 4 + 10, config.height / 1.5 + 10, this.progressBarGR.generateTexture());
    this.progressBarGR.destroy();
    this.load.setPreloadSprite(this.progressBar);

    // Background
    this.load.image('bm_bg', 'assets/BG/bm_bg.png');
    this.load.image('bm_ground', 'assets/BG/bm_ground.png');

    // Loki
    this.load.spine('loki', 'assets/Character/Loki/loki_upgraded.json');
    this.load.image('spear', 'assets/Character/Loki/upgrade_loki_spear.png');

    // Thor
    this.load.spine('thor', 'assets/Character/Thor/thor_odinson.json');
    this.load.image('hammer', 'assets/Character/Thor/hammer_thor.png');

    // FX
    this.load.image('ash_pile', 'assets/FX/FX_Ash_pile_0.png');
    this.load.image('coil_l', 'assets/FX/FX_Light_coil_L.png');
    this.load.image('coil_m', 'assets/FX/FX_Light_coil_M.png');
    this.load.image('lightning_0', 'assets/FX/FX_Mjolnir_lightning_0.png');
    this.load.image('lightning_1', 'assets/FX/FX_Mjolnir_lightning_1.png');
    this.load.image('lightning_1a', 'assets/FX/FX_Mjolnir_lightning_1a.png');
    this.load.image('star', 'assets/FX/star.png');

    // UI
    this.load.image('arrow', 'assets/UI/arrow.png');
    this.load.image('chest', 'assets/UI/chest.png');
    this.load.image('finish_him', 'assets/UI/finish_him.png');
    this.load.image('flag_victory', 'assets/UI/flag_victory.png');
    this.load.image('icon_thor_odinson', 'assets/UI/icon_thor_odinson.png');
    this.load.image('icon_upgrade_loki', 'assets/UI/icon_upgrade_loki.png');
    this.load.image('tutor_hand', 'assets/UI/tutor_hand.png');

    // testing progressbar
    /*
    for (let i = 0; i <500; i++){
      this.load.image('tutor_hand', 'assets/UI/tutor_hand.png');
    }
    */
  },
  create() {
    this.state.start('mainScene');
  },
};
