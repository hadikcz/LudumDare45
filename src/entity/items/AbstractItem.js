import Depths from 'structs/Depths';

export default class AbstractItem extends Phaser.GameObjects.Image {
    constructor (scene, x, y, keyFrame, name) {
        super(scene, x, y, 'assets', keyFrame);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        /**
         * @type {boolean}
         * @private
         */
        this._isPickedUp = false;

        /**
         * @type {string}
         * @private
         */
        this._name = name;

        this.setDepth(Depths.ITEMS);
        this.body.setDrag(10, 10);
        this.body.setCollideWorldBounds(true);
        this.body.setFriction(0.6);
    }

    /**
     * @return {boolean}
     */
    isPickedUp () {
        return this._isPickedUp;
    }

    preUpdate () {
        if (this.body.touching.down) {
            this.body.setAngularDrag(150);
            this.body.setDrag(30, 10);
        }
    }

    interact () {
        this.scene.playerCharacter.pickUp(this);
        this.pickUp();
    }

    getInteractText () {
        return 'Pickup ' + this._name;
    }

    pickUp () {
        this._isPickedUp = true;
        this.body.allowGravity = false;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    putDown (x, y) {
        this._isPickedUp = false;
        this.body.allowGravity = true;
        this.setPosition(x, y);
    }
}
