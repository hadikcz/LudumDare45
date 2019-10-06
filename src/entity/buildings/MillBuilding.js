    import Depths from 'structs/Depths';
    import HarvestedCrop from 'entity/items/HarvestedCrop';
    import Flour from 'entity/items/Flour';
    import ProgressBarUI from 'ui/ProgressBarUI';
    import GameConfig from 'GameConfig';
    import BuildingStatesTiming from 'structs/BuildingStatesTiming';

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
         * @type {ProgressBarUI}
         */
        this.healthbar = new ProgressBarUI(this.scene, {
            followTarget: this,
            atlas: 'assets',
            atlasBg: 'progress_bar_bg',
            atlasBar: 'progress_bar_inner',
            tintBar: 0x00FF00,
            depth: Depths.UI,
            offsetX: -15,
            offsetY: -260
        });
        this.healthbar.setPercent(0);
        this.healthbar.hide();

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
        this.loopTimeout = null;
    }

    preUpdate () {
        if (this.queue > 0) {
            if (!this.loopTimeout) {
                let tick = 10;
                let percent = 0;
                this.healthbar.show();
                let interval = setInterval(() => {
                    let value = 100 / (GameConfig.MillLoop / tick);
                    percent += value;
                    this.healthbar.setPercent(percent);
                    if (percent >= 100) {
                        clearInterval(interval);
                    }
                }, tick);
                this.loopTimeout = setTimeout(() => {
                    this._millLoop();
                }, GameConfig.MillLoop);
            }
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
        this.queue--;
        this._flushFlour();
        clearTimeout(this.loopTimeout);
        this.loopTimeout = null;
        this.healthbar.hide();
    }

    _flushFlour () {
        for (let i = 0; i < Phaser.Math.RND.integerInRange(1, 2); i++) {
            let item = new Flour(this.scene, this.x, this.y);
            item.explode();
            this.scene.gameEnvironment.items.add(item);
        }
    }
}
