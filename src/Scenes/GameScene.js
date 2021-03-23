import Phaser from 'phaser';
import gameOptions from '../Config/gameOptions';
import loaders from '../loaders/loader';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.score = 0;
    this.add.image(400, 300, 'sky');
    this.addedPlatforms = 0;

    this.starGroup = this.add.group({
      removeCallback(star) {
        star.scene.starPool.add(star);
      },
    });

    this.starPool = this.add.group({
      removeCallback(star) {
        star.scene.starGroup.add(star);
      },
    });

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.addPlatform(this.game.config.width, this.game.config.width / 2);

    const collectStar = (player, star) => {
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
      this.starGroup.killAndHide(star);
      this.starGroup.remove(star);
    };

    this.player = this.physics.add.sprite(100, 250, 'dude');

    this.player.setBounce(0);
    this.player.setGravityY(gameOptions.playerGravity);

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 6 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, this.platformGroup);
    this.physics.add.overlap(this.player, this.starGroup, collectStar, null, this);
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '32px', fill: '#000' });
  }

  addPlatform(platformWidth, posX) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, this.game.config.height * 0.8, 'platform');
      platform.body.allowGravity = false;
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformD = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);

    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.starPercent) {
        if (this.starPool.getLength()) {
          const star = this.starPool.getFirst();
          star.x = posX;
          star.active = true;
          star.visible = true;
          this.starPool.remove(star);
        } else {
          const star = this.physics.add.image(posX, gameOptions.starDownPosition, 'star');
          star.body.allowGravity = false;
          star.setImmovable(true);
          star.setVelocityX(platform.body.velocity.x);
          this.starGroup.add(star);
        }
      }
    }
  }

  update() {
    if (this.player.y > this.game.config.height) {
      loaders.submitScore(localStorage.getItem('username'), this.score);
      this.scene.start('Credits');
    }
    this.player.x = gameOptions.playerStartPosition;

    this.cursors = this.input.keyboard.createCursorKeys();

    if (this.player.body.touching.down) {
      this.player.anims.play('right', true);
      this.player.setVelocityY(0);
      this.player.setVelocityX(gameOptions.platformStartSpeed);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.anims.play('turn', true);
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.player.setVelocityX(0);
    }

    let minDistance = this.game.config.width;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    if (minDistance > this.nextPlatformD) {
      const nextPlatformWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1],
      );
      this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2);
    }
  }
}
