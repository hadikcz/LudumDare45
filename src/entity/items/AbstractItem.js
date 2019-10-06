import Depths from 'structs/Depths';

export default class AbstractItem extends Phaser.GameObjects.Sprite {
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

        /**
         * @type {number}
         * @private
         */
        this._price = 0;

        this.setDepth(Depths.ITEMS);
        this.body.setMass(10);
        this.body.setCollideWorldBounds(true);
    }

    explode (initY = false) {
        if (!initY) {
            initY = Phaser.Math.RND.integerInRange(-250, -150);
        }
        this.body.setVelocity(
            Phaser.Math.RND.integerInRange(-80, 80),
            Phaser.Math.RND.integerInRange(initY - 50, initY + 50)
        );

        this.body.angularVelocity = Phaser.Math.RND.integerInRange(0, 100);
    }

    /**
     * @return {string}
     */
    getName () {
        return this._name;
    }

    /**
     * @return {number}
     */
    getPrice () {
        return this._price;
    }

    /**
     * @return {boolean}
     */
    isPickedUp () {
        return this._isPickedUp;
    }

    preUpdate () {
        if (this.body.touching.down) {
            this.afterTouchGround();
        }
    }

    afterTouchGround () {
        this.body.setAngularDrag(150);
        this.body.setDrag(250, 10);
    }

    interact () {
        this.scene.playerCharacter.pickUp(this);
        this.pickUp();
    }

    getInteractText () {
        return 'Pickup ' + this._name;
    }

    pickUp () {
        this.scene.soundManager.take.play();
        this._isPickedUp = true;
        this.body.allowGravity = false;
        this.body.angularVelocity = 0;
        this.afterTouchGround();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {Phaser.Math.Vector2} velocity
     */
    putDown (x, y, velocity) {
        this._isPickedUp = false;
        this.body.allowGravity = true;
        this.setPosition(x, y);
        if (velocity !== undefined) {
            this.body.setVelocity(velocity.x * 1.25, velocity.y);
        }
        this.afterTouchGround();
    }
}
