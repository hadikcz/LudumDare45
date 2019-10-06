import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import Depths from 'structs/Depths';
import WellBuilding from 'entity/WellBuilding';
import BakeryBuilding from 'entity/BakeryBuilding';
import Grain from 'entity/Grain';

export default class GameEnvironment {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        let yFix = -55;

        this.scene.add.image(0, yFix, 'sky')
            .setScrollFactor(0)
            .setOrigin(0);

        this.scene.add.image(0, yFix + 110, 'bg1')
            .setScrollFactor(0)
            .setOrigin(0);

        this.scene.add.image(-150, yFix + 90, 'bg2')
            .setScrollFactor(0.1)
            .setOrigin(0);

        this.scene.add.image(0, yFix + 40, 'bg3')
            .setScrollFactor(0.2)
            .setOrigin(0);

        this.scene.add.image(950, yFix + 40, 'bg3')
            .setScrollFactor(0.25)
            .setOrigin(0);

        /**
         * @type {Phaser.GameObjects.Group}
         */
        this.groundGroup = this.scene.add.group();

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._bgStatic = this.scene.add.group();

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._grassGroup = this.scene.add.group();

        this._createBgStatic();
        this._createGround();
        this._createGrass();

        /**
         * @type {WellBuilding}
         */
        this.wellBuilding = new WellBuilding(this.scene, 300, this.getGroundDimensionY());

        /**
         * @type {WellBuilding}
         */
        this.bakeryBuilding = new BakeryBuilding(this.scene, 500, this.getGroundDimensionY());

        this.scene.add.image(150, this.getGroundDimensionY(), 'assets', 'Mill').setOrigin(0.5, 1);
        this.millWheel = this.scene.add.image(150, this.getGroundDimensionY() - 135, 'assets', 'Mill wheel');

        this.grain = new Grain(this.scene, 340, this.getGroundDimensionY());
    }

    update () {
        this.millWheel.rotation -= 0.01;
    }

    getGroundDimensionY () {
        return GameConfig.GameWindowSettings.height - this.scene.textures.getFrame('assets', 'Ground').height + 2;
    }

    _createGround () {
        let y = GameConfig.GameWindowSettings.height;
        let width = this.scene.textures.getFrame('assets', 'Ground').width;
        for (let i = -1; i < 6; i++) {
            let ground = this.scene.add.image(i * width, y, 'assets', 'Ground').setOrigin(0, 1)
                .setDepth(Depths.GROUND);
            this.scene.physics.world.enable(ground);
            ground.body.setImmovable(true);
            ground.body.allowGravity = false;
            this.groundGroup.add(ground);
        }
    }

    _createBgStatic () {
        let y = GameConfig.GameWindowSettings.height - 60;
        let width = this.scene.textures.getFrame('bgStatic').width;
        for (let i = -2; i < 7; i++) {
            let ground = this.scene.add.image(i * width, y, 'bgStatic').setOrigin(0, 1)
                .setDepth(Depths.BG_STATIC);
            this._bgStatic.add(ground);
        }
    }

    _createGrass () {
        let y = this.getGroundDimensionY() - 8;
        let width = this.scene.textures.getFrame('assets', 'Grass').width;
        for (let i = -1; i < 6; i++) {
            let ground = this.scene.add.image(i * width, y, 'assets', 'Grass').setOrigin(0, 0)
                .setDepth(Depths.GRASS);
            this._grassGroup.add(ground);
        }
    }
}
