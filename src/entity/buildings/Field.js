import Depths from 'structs/Depths';
import Grain from 'entity/buildings/Grain';

export default class Field extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'field');
        this.scene.add.existing(this);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Field';

        /**
         * @type {boolean}
         */
        this.isOccupied = false;

        /**
         * @type {Grain}
         */
        this.grain = null;

        this.setOrigin(0.5, 1);
        this.setDepth(Depths.FIELD);
    }

    interact () {
        if (!this.isOccupied) {
            this.grain = new Grain(this.scene, this.x, this.scene.gameEnvironment.getGroundDimensionY());
            this.grain.setField(this);
            this.scene.gameEnvironment.addNewBuilding(this.grain);
            this.isOccupied = true;
        }
    }

    getInteractText () {
        if (!this.isOccupied) {
            return 'Plant the seed';
        }
    }

    clean () {
        this.isOccupied = false;
        this.grain = null;
    }
}
