import Phaser from 'phaser';
import GameConfig from 'GameConfig';
import Depths from 'structs/Depths';
import WellBuilding from 'entity/buildings/WellBuilding';
import BakeryBuilding from 'entity/buildings/BakeryBuilding';
import Grain from 'entity/buildings/Grain';
import MillBuilding from 'entity/buildings/MillBuilding';
import HarvestedCrop from 'entity/items/HarvestedCrop';
import Merchant from 'entity/buildings/Merchant';

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

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._buildingsAndItems = this.scene.add.group();

        /**
         * @type {Phaser.GameObjects.Group}
         */
        this.items = this.scene.add.group();

        this._createBgStatic();
        this._createGround();
        this._createGrass();

        /**
         * @type {WellBuilding}
         */
        this.wellBuilding = new WellBuilding(this.scene, 300, this.getGroundDimensionY());
        this._buildingsAndItems.add(this.wellBuilding);

        this.merchant = new Merchant(this.scene, 350, this.getGroundDimensionY());
        this._buildingsAndItems.add(this.merchant);

        /**
         * @type {WellBuilding}
         */
        // this.bakeryBuilding = new BakeryBuilding(this.scene, 500, this.getGroundDimensionY());
        // this._buildingsAndItems.add(this.bakeryBuilding);

        // this.millBuilding = new MillBuilding(this.scene, 150, this.getGroundDimensionY());
        // this._buildingsAndItems.add(this.millBuilding);
    }

    update () {
    }

    getGroundDimensionY () {
        return GameConfig.GameWindowSettings.height - this.scene.textures.getFrame('assets', 'Ground').height + 2;
    }

    findNearestInteractiveItem (target) {
        let item = this._findNearestInteractiveItem(target);
        if (item) return item;
        return this._findNearestInteractiveItemBuilding(target);
    }

    _findNearestInteractiveItemBuilding (target) {
        let nearest = null;
        let nearestDistance = Infinity;
        this._buildingsAndItems.getChildren().forEach((subject) => {
            let distance = Phaser.Math.Distance.Between(subject.x, subject.y, target.x, target.y);
            if (distance < GameConfig.MinimalInteractiveDistance && distance < nearestDistance) {
                if (subject._name === 'Field' && subject.isOccupied) return;
                nearest = subject;
                nearestDistance = distance;
            }
        });
        return nearest;
    }

    _findNearestInteractiveItem (target) {
        let nearest = null;
        let nearestDistance = Infinity;
        this.items.getChildren().forEach((subject) => {
            let distance = Phaser.Math.Distance.Between(subject.x, subject.y, target.x, target.y);
            if (distance < GameConfig.MinimalInteractiveDistanceItem && distance < nearestDistance && !subject.isPickedUp()) {
                nearest = subject;
                nearestDistance = distance;
            }
        });
        return nearest;
    }

    addNewBuilding (gameObject) {
        this._buildingsAndItems.add(gameObject);
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
