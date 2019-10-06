/* globals __DEV__ */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import GameConfig from './GameConfig.js';
import Stats from 'stats.js/src/Stats';

window.skipStory = false;
window.totalIncome = 0;
window.started = Math.round(Date.now() / 1000);

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: false,
    parent: 'content',
    width: GameConfig.GameWindowSettings.width,
    height: GameConfig.GameWindowSettings.height,
    backgroundColor: '#000000',
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        // matter: {
        //     gravity: {
        //         scale: 0
        //     },
        //     debug: true
        // },
        // plugins: {
        //     attractors: true
        // },
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    antialias: true,
    scene: [
        BootScene,
        GameScene
    ]
};

let game = new Phaser.Game(config);

// var stats = new Stats();
// document.body.appendChild(stats.dom);
//
// requestAnimationFrame(function loop () {
//     stats.update();
//     requestAnimationFrame(loop);
// });
