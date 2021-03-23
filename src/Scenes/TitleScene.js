import Phaser from 'phaser';
import config from '../Config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 568, 'platform').setScale(2);

    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);
    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditsButton, -1);
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });

    this.leaderBoardButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.leaderBoardButton);
    this.leaderText = this.add.text(0, 0, 'LeaderBoard', { fontSize: '25px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.leaderText, this.leaderBoardButton);

    this.leaderBoardButton.on('pointerdown', () => {
      this.scene.start('Leader');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject, this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width, config.height,
      ),
    );
  }
}
