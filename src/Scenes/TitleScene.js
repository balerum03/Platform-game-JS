import Phaser from  'phaser';
import config from '../Config/config';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  preload () {
  }
 
  create () {
    this.add.image(400,300, 'sky');
    this.add.image(400, 568, 'platform').setScale(2);

    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);
    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);
    
    this.gameButton.on('pointerdown', function (pointer) {
      this.scene.start('Game');
    }.bind(this));
    
    this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditsButton, -1);
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditsText, this.creditsButton);
    
    this.creditsButton.on('pointerdown', function (pointer) {
      this.scene.start('Credits');
    }.bind(this));

    this.leaderBoardButton = this.add.sprite(100,200, 'blueButton1').setInteractive();
    this.centerButton(this.leaderBoardButton);
    this.leaderText = this.add.text(0, 0, 'LeaderBoard', { fontSize: '25px', fill: '#fff'});
    this.centerButtonText(this.leaderText, this.leaderBoardButton);

    this.leaderBoardButton.on('pointerdown', function (pointer){
      console.log('my name is adan');
      this.scene.start('Leader');
    }.bind(this));
    
    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton2');
    });
    
    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton1');
    });

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton2');
    });
    
    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton1');
    });
    }

    centerButton (gameObject, offset = 0) {
      Phaser.Display.Align.In.Center(gameObject,this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height));
    }
    
    centerButtonText (gameText, gameButton) {
      Phaser.Display.Align.In.Center(gameText,gameButton);
    }
};
