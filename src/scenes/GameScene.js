/* eslint-disable no-trailing-spaces */
/* global __DEV__ */
import Phaser from 'phaser';
import EffectManager from './../effects/EffectManager';
import GameEnvironment from '../core/GameEnvironment';
import UI from './../ui/UI';
import SoundManager from 'core/SoundManager';
import GameConfig from 'GameConfig';
import PlayerCharacter from 'entity/PlayerCharacter';
import InteractiveControler from 'controlers/InteractiveControler';
import GameControls from 'input/GameControls';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GameScene' });
        /**
         * @type {EffectManager}
         */
        this.effectManager = null;

        /**
         * @type {UI}
         */
        this.ui = null;

        this.isGameOver = false;
    }

    create () {
        window.gameScene = this;
        this.physics.world.setBounds(0, 0, GameConfig.World.width, GameConfig.World.height);
        this.effectManager = new EffectManager(this);
        // this.cameras.main.startFollow({ x: GameConfig.World.width / 2, y: GameConfig.World.height / 2 });

        // this.cameras.main.setBounds(0, 0, 1500, GameConfig.GameWindowSettings.height);

        // this.cameras.main.setZoom(GameConfig.GameWindowSettings.initZoom);

        this.gameEnvironment = new GameEnvironment(this);
        this.soundManager = new SoundManager(this);

        let spawnY = GameConfig.GameWindowSettings.height - this.textures.getFrame('assets', 'Ground').height;
        this.playerCharacter = new PlayerCharacter(this, 300, this.gameEnvironment.getGroundDimensionY() - 60);

        this.interactiveControler = new InteractiveControler(this, this.playerCharacter);

        this.ui = new UI(this);

        this.gameControls = new GameControls(this);

        this.physics.add.collider(this.playerCharacter, this.gameEnvironment.groundGroup);
    }

    update () {
        this.gameControls.update();
        this.playerCharacter.update();
        this.gameEnvironment.update();
    }
}
