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
import BuildControler from 'controlers/BuildControler';
import Buildings from 'structs/Buildings';

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

        /**
         * @type {boolean}
         */
        this.isGameOver = false;

        /**
         * @type {number}
         */
        this.coins = 100000;
    }

    create () {
        window.gameScene = this;
        this.physics.world.setBounds(0, 0, GameConfig.World.width, GameConfig.World.height);
        this.effectManager = new EffectManager(this);

        this.gameEnvironment = new GameEnvironment(this);
        this.soundManager = new SoundManager(this);

        let spawnY = GameConfig.GameWindowSettings.height - this.textures.getFrame('assets', 'Ground').height;
        this.playerCharacter = new PlayerCharacter(this, 300, this.gameEnvironment.getGroundDimensionY() - 60);

        this.interactiveControler = new InteractiveControler(this, this.playerCharacter);
        this.buildControler = new BuildControler(this, this.playerCharacter, this.gameEnvironment);

        this.ui = new UI(this);

        this.gameControls = new GameControls(this);

        this.physics.add.collider(this.playerCharacter, this.gameEnvironment.groundGroup);
        this.physics.add.collider(this.gameEnvironment.items, this.gameEnvironment.groundGroup);

        this.ui.show();

        this.updateCoins(Buildings.getBuildingById(1).price);
    }

    update () {
        this.gameControls.update();
        this.playerCharacter.update();
        this.gameEnvironment.update();
    }

    updateCoins (value) {
        this.coins += value;
        this.ui.coinSelector.html(this.coins);
    }

    gameOver () {
        this.ui.hide();
        this.scene.start('StoryTellEndScene');
    }
}
