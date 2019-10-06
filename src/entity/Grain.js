import Depths from 'structs/Depths';

export default class WellBuilding extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'Grain');
        this.scene.add.existing(this);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Grain';

        this.setOrigin(0.5, 1);
        this.setDepth(Depths.GRAIN);
    }

    interact () {
        console.log('interacting with ' + this._name);
    }

    getInteractText () {
        return this._name;
    }
}
