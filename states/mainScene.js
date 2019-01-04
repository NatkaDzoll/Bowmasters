const mainScene = {
  // ------------------------------------------------- CREATE --------------------------------------------------------
  create() {
    // IMPORTANT
    this.world.setBounds(0, 0, config.width, config.height);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = config.gravity;

    // BG___
    this.background = this.add.tileSprite(0, 0, 5049, 2002, 'bm_bg');
    this.background.scale.setTo(config.spriteScale);
    this.ground = this.add.tileSprite(0, config.groundH, 5049, 326, 'bm_ground');
    this.ground.scale.setTo(config.spriteScale);

    // BG___ GRAVITY
    this.physics.arcade.enable(this.ground);
    this.ground.body.enable = true;
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    // INFO PLAYERS___
    this.infoBarGroup = game.add.group();
    this.infoBarGroup.fixedToCamera = true;

    this.infoBox_infoBar = this.add.graphics(config.width / 4 - 40, 75, this.infoBarGroup);
    this.infoBox_infoBar.beginFill(0xa5279f, 1);
    this.infoBox_infoBar.drawRoundedRect(0, 0, config.width / 2 + 80, 110, 55);

    this.logo_infoBar = this.add.image(config.width / 2, 10, 'logo', {}, this.infoBarGroup);
    this.logo_infoBar.anchor.setTo(config.anchorPoint, 0);
    this.logo_infoBar.scale.setTo(config.spriteScale);

    // INFO PLAYERS___ PLAYER SIDE
    this.healthBarPlayerFull_infoBar = this.add.graphics(config.width / 4 - 40, 95, this.infoBarGroup);
    this.healthBarPlayerFull_infoBar.beginFill(0x91148d);
    this.healthBarPlayerFull_infoBar.drawRoundedRect(0, 0, 330, 70, 35);

    this.healthPlayerGR_InfoBar = this.add.graphics(0, 0, this.infoBarGroup);
    this.healthPlayerGR_InfoBar.beginFill(0xff0000);
    this.healthPlayerGR_InfoBar.drawRoundedRect(0, 0, 330, 70, 35);
    this.healthPlayer_InfoBar = this.add.sprite(config.width / 4 - 40, 95, this.healthPlayerGR_InfoBar.generateTexture(), {}, this.infoBarGroup);
    this.healthPlayerGR_InfoBar.destroy();

    this.playerImg_infoBar = this.add.image(config.width / 4, 70, 'icon_thor_odinson', {}, this.infoBarGroup);
    this.playerImg_infoBar.anchor.setTo(config.anchorPoint, 0);
    this.playerImg_infoBar.scale.setTo(config.spriteScale);


    // INFO PLAYERS___ ENEMY SIDE
    this.healthBarEnemyFull_infoBar = this.add.graphics(config.width - config.width / 4 - 290, 95, this.infoBarGroup);
    this.healthBarEnemyFull_infoBar.beginFill(0x91148d, 1);
    this.healthBarEnemyFull_infoBar.drawRoundedRect(0, 0, 330, 70, 35);

    this.healthEnemyGR_InfoBar = this.add.graphics(0, 0, this.infoBarGroup);
    this.healthEnemyGR_InfoBar.beginFill(0xff0000, 1);
    this.healthEnemyGR_InfoBar.drawRoundedRect(0, 0, 330, 70, 35);
    this.healthEnemy_InfoBar = this.add.sprite(config.width - config.width / 4 + 40, 95, this.healthEnemyGR_InfoBar.generateTexture(), {}, this.infoBarGroup);
    this.healthEnemy_InfoBar.anchor.setTo(1, 0);
    this.healthEnemyGR_InfoBar.destroy();

    this.enemyImg_infoBar = this.add.image(config.width - config.width / 4, 70, 'icon_upgrade_loki', {}, this.infoBarGroup);
    this.enemyImg_infoBar.anchor.setTo(config.anchorPoint, 0);
    this.enemyImg_infoBar.scale.setTo(config.spriteScale);

    // PLAYER___
    player = this.add.spine(config.padding, config.groundH, 'thor');
    player.scale.setTo(config.spriteScale);
    player.addAnimationByName(0, 'idle_apple', true);

    this.input.onDown.add(this.playerAim);

    // PLAYER___ PHYSICS
    this.playerAsTarget = this.add.graphics(player.x - 30, player.y - config.characterHeight);
    this.playerAsTarget.beginFill('#00ff00', 0);
    this.playerAsTarget.drawRect(0, 0, 100, config.characterHeight);
    this.physics.arcade.enable(this.playerAsTarget);
    this.playerAsTarget.body.enable = true;
    this.playerAsTarget.body.allowGravity = false;
    this.playerAsTarget.body.immovable = true;

    // ENEMY___
    enemy = this.add.spine(config.width - config.padding, config.groundH, 'loki');
    enemy.scale.y *= config.spriteScale;
    enemy.scale.x *= -config.spriteScale;

    // ENEMY___ PHYSICS
    this.enemyAsTarget = this.add.graphics(enemy.x - 60, enemy.y - config.characterHeight);
    this.enemyAsTarget.beginFill('#00ff00', 0);
    this.enemyAsTarget.drawRect(0, 0, 100, config.characterHeight);
    this.physics.arcade.enable(this.enemyAsTarget);
    this.enemyAsTarget.body.enable = true;
    this.enemyAsTarget.body.allowGravity = false;
    this.enemyAsTarget.body.immovable = true;

    // CAMERA FIRST STEP
    this.camera.follow(player);
    this.infoBarGroup.scale.setTo(0.65);
    this.camera.scale.x += config.spriteScale;
    this.camera.scale.y += config.spriteScale;

    // DISTANCE INDICATOR
    this.distanseGroup = this.add.group();
    this.distanseGroup.fixedToCamera = true;

    this.distanseBox = this.add.graphics(0, 0, this.distanseGroup);
    this.distanseBox.beginFill('0x813a86', 1);
    this.distanseBox.drawRoundedRect(config.width / 2 + 90, config.groundH / 2, 150, 140, 30);
    this.distanseBox.anchor.setTo(config.anchorPoint);

    this.arrow_distanceGroup = game.add.sprite(config.width / 2 + 250, config.groundH / 2 + 67, 'arrow', {}, this.distanseGroup);
    this.arrow_distanceGroup.scale.setTo(2);
    this.arrow_distanceGroup.anchor.setTo(config.anchorPoint);

    this.icon_distanseGroup = this.add.image(config.width / 2 + 165, config.groundH / 2 + 50, 'icon_upgrade_loki', {}, this.distanseGroup);
    this.icon_distanseGroup.anchor.setTo(config.anchorPoint);
    this.icon_distanseGroup.scale.setTo(0.35);

    this.text_distanceGroup = this.add.text(config.width / 2 + 165, config.groundH / 2 + 115, '', { font: '40px Courier', fill: '#ffffff', align: 'center' }, this.distanseGroup);
    this.text_distanceGroup.anchor.setTo(config.anchorPoint);

    // TUTORIAL
    this.tutorialGroup = this.add.group();

    this.layer_tutorial = this.add.graphics(0, 0, this.tutorialGroup);
    this.layer_tutorial.lineColor = 0x000000;
    this.layer_tutorial.lineAlpha = 0.85;
    this.layer_tutorial.lineWidth = 220;
    this.layer_tutorial.drawCircle(90, 200, 400);
    this.layer_tutorial.scale.setTo(3.5);

    this.hand_tutorial = this.add.sprite(300, 700, 'tutor_hand', {}, this.tutorialGroup);
    this.hand_tutorial.scale.setTo(2);
    this.add.tween(this.hand_tutorial).to({ x: 100, y: 800 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    this.textBox_tutorial = this.add.graphics(80, 490, this.tutorialGroup);
    this.textBox_tutorial.beginFill(0xff0d0f, 0.7);
    this.textBox_tutorial.drawRoundedRect(0, 0, 470, 90, 45);

    this.text_tutorial = this.add.text(105, 497, 'Tap & Drag', { font: '70px Courier', fill: '#ffffff', align: 'center' }, this.tutorialGroup);
    this.tutorialGroup.position.y = 90;

    // WIN BOX
    this.prizeGroup = game.add.group();
    this.prizeGroup.fixedToCamera = true;
    this.prizeGroup.visible = false;

    this.winBox = game.add.sprite(player.x, player.y - config.characterHeight * 2.1, 'flag_victory', {}, this.prizeGroup);
    this.winBox.scale.setTo(config.spriteScale);
    this.winBox.anchor.setTo(config.anchorPoint);

    this.prizeSquare = this.add.graphics(0, 0, this.prizeGroup, this.prizeGroup);
    this.prizeSquare.anchor.setTo(config.anchorPoint);
    this.prizeSquare.beginFill('0xa5279f', 1);
    this.prizeSquare.drawRect(config.width / 3 - 30, 0, config.width, config.height);

    this.prizeLogo = this.add.image(this.prizeSquare.x + 955, this.prizeSquare.y + 120, 'logo', {}, this.prizeGroup);
    this.prizeLogo.anchor.setTo(config.anchorPoint);
    this.prizeLogo.scale.setTo(config.spriteScale);

    this.prizeTextBox = this.add.graphics(this.prizeSquare.x + 955 - 470 / 2, 260, this.prizeGroup);
    this.prizeTextBox.beginFill(0x000000, 0.4);
    this.prizeTextBox.drawRoundedRect(0, 0, 470, 70, 35);

    this.prizeText = this.add.text(this.prizeSquare.x + 955, 300, 'You got a prize!', { font: '45px Courier', fill: '#ffffff', align: 'center' }, this.prizeGroup);
    this.prizeText.anchor.setTo(config.anchorPoint);

    this.prizeChest = this.add.image(this.prizeSquare.x + 955, this.prizeSquare.y + 470, 'chest', {}, this.prizeGroup);
    this.prizeChest.anchor.setTo(config.anchorPoint);
    this.prizeChest.scale.setTo(config.spriteScale);

    this.playGameBox = this.add.graphics(this.prizeSquare.x + 955 - 400 / 2, 600, this.prizeGroup);
    this.playGameBox.beginFill(0x08c9d8, 0.9);
    this.playGameBox.drawRoundedRect(0, 0, 400, 100, 50);

    this.prizeText = this.add.text(this.prizeSquare.x + 955, 655, 'PLAY NOW', { font: '70px Courier', fill: '#ffffff', align: 'center' }, this.prizeGroup);
    this.prizeText.anchor.setTo(config.anchorPoint);

    // AIM LINE
    this.aimLineGR = this.add.graphics();
    this.aimLineGR.beginFill('0xffffff', 0.8);
    for (let i = 1; i < 10; i++) {
      this.aimLineGR.drawCircle(60 * i, 0, 20 - i);
    }
    this.aimLine = this.add.sprite(0, 0, this.aimLineGR.generateTexture());
    this.aimLine.visible = false;
    this.aimLineGR.destroy();

    // AIM LINE RIGHT GREEN
    this.aimLineRightGR = this.add.graphics();
    this.aimLineRightGR.beginFill('0x9ce200', 0.6);
    for (let i = 1; i < 10; i++) {
      this.aimLineRightGR.drawCircle(60 * i, 0, 20 - i);
    }
    this.aimLineRight = this.add.sprite(0, 0, this.aimLineRightGR.generateTexture());
    this.aimLineRight.visible = false;
    this.aimLineRightGR.destroy();

    // INPUTS
    this.input.onDown.add(this.playerAim);
    this.input.onUp.add(this.playerShot);
    this.input.addMoveCallback(this.adjustAiming, this);
  },
  // ------------------------------------------------- UPDATE --------------------------------------------------------
  update() {

    if (playerShooting){
        game.physics.arcade.collide(playerWeapon, mainScene.ground, () => {
            playerWeapon.body.velocity.set(0);
            playerWeapon.body.immovable = true;
            playerWeapon.body.allowGravity = false;
            game.tweens.remove(game.playerWeaponTween);
            enemy.setAnimationByName(0, 'fall', false); // NOT E scare animation
            game.camera.follow(enemy, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);

            if (enemyHealth <= 0) {
                this.playerWin();
            } else {
                setTimeout(() => {
                    enemy.onEvent.add((i, e) => {
                        this.enemyShot(i, e);
                    });
                }, 1000);
            }

        });

        game.physics.arcade.collide(playerWeapon, mainScene.enemyAsTarget, () => {
            enemyHealth -= 50;
            mainScene.healthEnemy_InfoBar.width = mainScene.healthEnemy_InfoBar.width / 100 * enemyHealth;
            mainScene.healthEnemy_InfoBar.updateCrop();
            playerWeapon.kill();
            game.camera.follow(enemy, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);

            switch (enemyHealth) {
                case 0:
                    this.finishHim();
                    break;
                case -50:
                    this.fatality();
                    break;
                default:
                    enemy.setAnimationByName(0, 'fall', false); // E
                    setTimeout(() => {
                        enemy.onEvent.add((i, e) => {
                            this.enemyShot(i, e);
                        });
                    }, 1000);
                    break;
            }
        });
    }

    game.physics.arcade.collide(enemyWeapon, mainScene.ground, () => {
      enemyWeapon.body.immovable = true;
      enemyWeapon.body.velocity.set(0);
      enemyWeapon.body.allowGravity = false;
      game.tweens.remove(game.enemyWeaponTween);
      player.setAnimationByName(2, 'scare', false); // E
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
      setTimeout(() => {
        enemyWeapon.kill();
        playerShooting = false;
        playerAiming = false;
      }, 700);
    });

    game.physics.arcade.collide(enemyWeapon, mainScene.playerAsTarget, () => {
      enemyWeapon.kill();
      playerHealth -= 30;
      mainScene.healthPlayer_InfoBar.width -= 330 / 100 * 30;
      mainScene.healthPlayer_InfoBar.updateCrop();
      player.setAnimationByName(0, 'default', false); // NOT E fall animation
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
      setTimeout(() => {
        playerShooting = false;
        playerAiming = false;
      }, 700);
    });

    game.physics.arcade.collide(this.fatalityHammer, mainScene.enemyAsTarget, () => {
      this.fatalityHammer.kill();
      setTimeout(() => {
        this.lightning_1 = game.add.sprite(enemy.x, enemy.y - 200, 'lightning_1a', {}, this.fatalityGroup);
        this.lightning_1.anchor.setTo(config.anchorPoint);
        this.lightning_1.scale.setTo(config.spriteScale);
        this.add.tween(this.lightning_1.scale).to({ x: 2, y: 2 }, 500, 'Linear', true, 0, -1, false);
        enemy.setAnimationByName(0, 'death_by_shock', true);
      }, 400);
    });

    this.distanceInMeters = Math.floor((enemy.x - game.camera.x - config.width / 2) / 20);
    if (this.distanceInMeters > 10) {
      mainScene.distanseGroup.visible = true;
      mainScene.text_distanceGroup.text = `${this.distanceInMeters} m`;
    } else {
      mainScene.distanseGroup.visible = false;
    }
  },

  // ---------------------------------------------- PLAYER AIM F -----------------------------------------------------
  playerAim() {
    // Tutorial off
    mainScene.tutorialGroup.destroy();

    // PLAYER___ WEAPON
    playerWeapon = game.add.sprite(player.x - 190, player.y - 220, 'hammer');
    playerWeapon.scale.setTo(config.spriteScale);
    playerWeapon.anchor.setTo(config.anchorPoint);
    playerWeapon.angle = -140;
    playerWeapon.visible = false;

    if (!this.playerShooting) {
      playerAiming = true;
      playerWeapon.visible = true;
      player.setAnimationByName(0, 'grenade_draw', false);
    }
  },

  // --------------------------------------------- ADJUST AIMING -----------------------------------------------------
  adjustAiming(e) {
    if (playerAiming) {
      // distance between initial and current position
      const distX = e.position.x - e.positionDown.x;

      if (distX < 30) {
        mainScene.aimLine.position.set(player.x + 80, player.y - 240);
        mainScene.aimLine.visible = true;
        mainScene.aimLineRight.position.set(player.x + 80, player.y - 240);
        mainScene.aimLineRight.visible = true;
        mainScene.aimLineRight.angle = Phaser.Math.radToDeg(-0.5);
        this.direction = Phaser.Math.angleBetween(e.position.x, e.position.y, e.positionDown.x, e.positionDown.y);
        mainScene.aimLine.angle = Phaser.Math.radToDeg(this.direction);
      } else {
        mainScene.aimLine.visible = false;
        mainScene.aimLineRight.visible = false;
      }
    }
  },

  // ---------------------------------------------- PLAYER SHOT ------------------------------------------------------
  playerShot() {
    if (mainScene.aimLine.visible) {
      const angleOfFire = Phaser.Math.degToRad(mainScene.aimLine.angle - 360);
      game.physics.enable(playerWeapon, Phaser.Physics.ARCADE);
      playerWeapon.body.velocity.set(0, 0);
      playerWeapon.body.enable = true;
      playerWeapon.body.velocity.set(config.throwSpeed * Math.cos(angleOfFire), config.throwSpeed * Math.sin(angleOfFire));
      game.playerWeaponTween = game.add.tween(playerWeapon).to({ angle: 270 }, 700, 'Linear', true, 0, -1, false);
      playerShooting = true;
      game.camera.follow(playerWeapon);
      player.setAnimationByName(0, 'grenade_shot', false);
    }
    playerAiming = false;
    mainScene.aimLine.visible = false;
    mainScene.aimLineRight.visible = false;
  },

  // ----------------------------------------------- ENEMY SHOT ------------------------------------------------------
  enemyShot(trackIndex, event) {
    if (event.data.name == 'Got_up') {
      // ENEMY___ WEAPON
      enemyWeapon = game.add.sprite(enemy.x + 90, enemy.y - 300, 'spear');
      enemyWeapon.scale.setTo(config.spriteScale);
      enemyWeapon.anchor.setTo(config.anchorPoint);
      enemyWeapon.angle = -40;
      enemyWeapon.visible = false;

      enemy.setAnimationByName(1, 'grenade_shot', false);
      enemyWeapon.visible = true;
      game.physics.enable(enemyWeapon, Phaser.Physics.ARCADE);
      enemyWeapon.body.enable = true;
      game.enemyWeaponTween = game.add.tween(enemyWeapon).to({ angle: -140 }, 1300, 'Linear', true, false);

      if (playerHealth > 50) {
        enemyWeapon.body.velocity.set(-2500, 0.001);
        game.camera.follow(enemyWeapon);
      } else {
        enemyWeapon.body.velocity.set(-1000, 10);
        game.camera.follow(enemyWeapon);
      }
    }
  },

  // ----------------------------------------------- FINISH HIM ------------------------------------------------------
  finishHim() {
    enemy.setAnimationByName(0, 'finish_him', true); // E
    this.finishHimBox = game.add.sprite(enemy.x, enemy.y - config.characterHeight, 'finish_him');
    this.finishHimBox.scale.setTo(config.spriteScale);
    this.finishHimBox.anchor.setTo(config.anchorPoint);
    setTimeout(() => {
      this.finishHimBox.destroy();
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
      playerShooting = false;
      playerAiming = false;
    }, 1500);
  },

  // ------------------------------------------------- FATALITY ------------------------------------------------------
  fatality() {
    this.fatalityGroup = game.add.group();
    this.fatalityHammer = game.add.sprite(enemy.x, 100, 'hammer', {}, this.fatalityGroup);
    this.fatalityHammer.scale.setTo(0.7);
    this.fatalityHammer.anchor.setTo(config.anchorPoint);
    this.fatalityHammer.angle = 300;
    this.physics.enable(this.fatalityHammer, Phaser.Physics.ARCADE);

    setTimeout(() => {
      this.fatalityGroup.destroy();
      this.enemyGrave = game.add.sprite(enemy.x, enemy.y, 'ash_pile');
      this.enemyGrave.anchor.setTo(0.5);
      enemy.destroy();
    }, 1700);

    setTimeout(this.playerWin, 2300);
  },

  // --------------------------------------------- END GAME BY WIN ---------------------------------------------------
  playerWin() {
    mainScene.infoBarGroup.destroy();
    mainScene.distanseGroup.destroy();
    mainScene.prizeGroup.visible = true;
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
    player.setAnimationByName(0, 'win', true);
  },
};
