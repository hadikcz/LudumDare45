import PlayerCharacterControls from 'input/PlayerCharacterControls';
import GameConfig from 'GameConfig';
import Depths from 'structs/Depths';

export default class PlayerCharacter extends Phaser.GameObjects.Container {
    constructor (scene, x, y) {
        super(scene, x, y, []);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        /**
         * @type {PlayerCharacterControls}
         * @private
         */
        this.controls = new PlayerCharacterControls(this.scene, this);

        /**
         * @type {number}
         * @private
         */
        this._movementSpeed = 250;

        /**
         * @type {number}
         * @private
         */
        this._jumpSpeed = 170;

        this.setDepth(Depths.PLAYER);
        this.scene.cameras.main.startFollow(this, false, 0.85, 0.85, 0, 210);

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.characterImage = this.scene.add.image(0, 0, 'assets', 'Character').setOrigin(0.5, 0);
        this.add(this.characterImage);

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.scythe = this.scene.add.image(14, 24, 'assets', 'Scythe');//.setScale(1, -1);
        this.add(this.scythe);

        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);

        this.body.setSize(22, 52);
    }

    update () {
        this.controls.update();
    }

    /**
     * @param {string} direction
     * @private
     */
    moveTo (direction) {
        if (direction === 'left') {
            this.setScale(-1, 1);
            this.body.setVelocityX(-this._movementSpeed);
        } else if (direction === 'right') {
            this.body.setVelocityX(this._movementSpeed);
            this.setScale(1, 1);
        }

        if (direction === 'jump' && this.body.touching.down) {
            this.body.setVelocityY(-this._jumpSpeed);
        }

        if (direction === 'stopX') {
            this.body.setVelocityX(0);
        }
    }
}
