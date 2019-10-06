    import Depths from 'structs/Depths';
    import HarvestedCrop from 'entity/items/HarvestedCrop';
    import Flour from 'entity/items/Flour';

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
        this.millWheel = this.scene.add.image(this.x, this.y - 135, 'assets', 'Mill wheel').setDepth(Depths.MILL_WHEEL);

        this.cropIcon = this.scene.add.image(0, -275, 'assets', 'Crops');
        this.cropIcon.setScale(2.5);
        this.cropIcon.setAlpha(0);
        this.add(this.cropIcon);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Mill';

        /**
         * @type {number}
         */
        this.queue = 0;

        this.scene.tweens.add({
            targets: this.cropIcon,
            duration: 500,
            alpha: 1,
            yoyo: true,
            repeat: Infinity
        });

        this.loopEvent = this.scene.time.addEvent({
            delay: 5000,
            repeat: Infinity,
            callbackScope: this,
            callback: this._millLoop
        });
    }

    preUpdate () {
        if (this.queue > 0) {
            this.millWheel.rotation -= 0.01;
            this.cropIcon.setVisible(false);
        } else {
            this.cropIcon.setVisible(true);
        }
    }

    interact () {
        if (!this.scene.playerCharacter.pickedItem || this.scene.playerCharacter.pickedItem.getName() !== 'Crop') return;

        let item = this.scene.playerCharacter.pickedItem;
        this.scene.playerCharacter.putDown(true);
        item.destroy();
        this.queue++;
    }

    getInteractText () {
        return this._name;
    }

    _millLoop () {
        if (this.queue > 0) {
            this.queue--;
            this._flushFlour();
        }
    }

    _flushFlour () {
        for (let i = 0; i < Phaser.Math.RND.integerInRange(1, 2); i++) {
            let item = new Flour(this.scene, this.x, this.y);
            item.explode();
            this.scene.gameEnvironment.items.add(item);
        }
    }
}
