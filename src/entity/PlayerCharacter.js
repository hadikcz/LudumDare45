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

        /**
         * @type {Phaser.GameObjects.GameObject}
         */
        this.pickedItem = null;

        /**
         * @type {Phaser.GameObjects.GameObject|null}
         * @private
         */
        this._nearestInteractiveItem = null;

        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);

        this.body.setDragX(600);

        this.body.setSize(22, 52);

        this._overHeadText = this.scene.add.text(0, 0, GameConfig.DefaultOverHeadText, { fontFamily: 'ARCADECLASSIC, Arial', fontSize: 55, color: '#FFFFFF' }); // '#FF0000'
        this._overHeadText.setOrigin(0.5, 2);
        this._overHeadText.setDepth(Depths.PLAYER_OVERHEAD_TEXT);
        this._overHeadText.setScale(0.25, 0.25);
        this.add(this._overHeadText);
    }

    /**
     * @return {Phaser.GameObjects.GameObject}
     */
    getNearestInteractiveItem () {
        return this._nearestInteractiveItem;
    }

    preUpdate () {
        this.controls.update();
        if (this.pickedItem) {
            this.pickedItem.setPosition(this.x, this.y + 20);
        }
    }

    update () {
        let nearestInteractiveItem = this.scene.gameEnvironment.findNearestInteractiveItem(this);
        if (nearestInteractiveItem) {
            this._nearestInteractiveItem = nearestInteractiveItem;
            this._overHeadText.setText(this._nearestInteractiveItem.getInteractText());
        } else {
            this._nearestInteractiveItem = null;
            this._overHeadText.setText(GameConfig.DefaultOverHeadText);
        }
        // this._overHeadText.setPosition(this.x, this.y);
    }

    /**
     * @param {string} direction
     * @private
     */
    moveTo (direction) {
        if (direction === 'left') {
            this.setScale(-1, 1);
            this._overHeadText.setScale(-0.25, 0.25);
            this.body.setVelocityX(-this._movementSpeed);
        } else if (direction === 'right') {
            this.body.setVelocityX(this._movementSpeed);

            this._overHeadText.setScale(0.25, 0.25);
            this.setScale(1, 1);
        }

        if (direction === 'jump' && this.body.touching.down) {
            this.body.setVelocityY(-this._jumpSpeed);
        }

        if (direction === 'stopX') {
            this.body.setVelocityX(0);
        }
    }

    pickUp (item) {
        if (this.pickedItem) return;
        this.pickedItem = item;
        // this.pickedItem.setPosition(0, -30);
        // this.add(this.pickedItem);
    }

    putDown (skipThrow = false) {
        if (!this.pickedItem) return;
        if (!skipThrow) {
            this.pickedItem.putDown(this.x, this.y, this.body.velocity);
        } else {
            this.pickedItem.putDown(this.x, this.y);
            // this.pickedItem.putDown(-10000, -10000);
        }
        this.pickedItem = null;
    }
}
