import Depths from 'structs/Depths';

export default class MillBuilding extends Phaser.GameObjects.Container {
    constructor (scene, x, y) {
        super(scene, x, y, []);
        this.scene.add.existing(this);

        this.setDepth(Depths.MILL);

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.mainSprite = this.scene.add.image(0, 0, 'assets', 'Mill').setOrigin(0.5, 1);
        this.add(this.mainSprite);

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.millWheel = this.scene.add.image(0, -135, 'assets', 'Mill wheel').setDepth(Depths.MILL_WHEEL);
        this.add(this.millWheel);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Mill';
    }

    update () {
        this.millWheel.rotation -= 0.01;
    }

    interact () {
        console.log('interacting with ' + this._name);
    }

    getInteractText () {
        return this._name;
    }
}
