import './styles/style.css';
import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import CreditsScene from './Scenes/CreditsScene';
import loaders from './loaders/loader.js';
import LeaderScene from './Scenes/LeaderScene.js';

if (localStorage.getItem('username')) {
  document.getElementById('hide-unless-username').remove();
  class Game extends Phaser.Game {
    constructor () {
      super(config);
      this.scene.add('Boot', BootScene);
      this.scene.add('Preloader', PreloaderScene);
      this.scene.add('Title', TitleScene);
      this.scene.add('Credits', CreditsScene);
      this.scene.add('Game', GameScene);
      this.scene.add('Leader', LeaderScene);
      this.scene.start('Boot');
    }
  }
  window.game = new Game();
} else {
  document.getElementById('hide-unless-username').classList.remove(['d-none']);
  const input = document.getElementById('nameInput');
  const button = document.getElementById('submitButton');
  button.addEventListener('click', () => {
    loaders.submitNameForm(input);
    window.location.reload();
  });
}

