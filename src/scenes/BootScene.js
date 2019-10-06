/* global gamee */
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene', plugins: ['Loader'] });
    }

    preload () {
        window.scene = this;

        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('GameScene');
        }, this);

        this.load.atlas('assets', 'assets/images/assets.png', 'assets/images/assets.json');

        this.load.image('bg1', 'assets/images/bg1.png');
        this.load.image('bg2', 'assets/images/bg2.png');
        this.load.image('bg3', 'assets/images/bg3.png');
        this.load.image('bgStatic', 'assets/images/bgStatic.png');
        this.load.image('sky', 'assets/images/sky.png');
    }
}
