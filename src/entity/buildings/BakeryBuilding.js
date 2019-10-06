import Depths from 'structs/Depths';
import Flour from 'entity/items/Flour';
import Bread from 'entity/items/Bread';
import ProgressBarUI from 'ui/ProgressBarUI';
import GameConfig from 'GameConfig';

export default class BakeryBuilding extends Phaser.GameObjects.Container {
    constructor (scene, x, y) {
        super(scene, x, y, []);
        this.scene.add.existing(this);

        this.setDepth(Depths.BAKERY);

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.mainSprite = this.scene.add.image(0, 0, 'assets', 'Bakery').setOrigin(0.5, 1);
        this.add(this.mainSprite);

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.toolSprite = this.scene.add.image(-25, 0, 'assets', 'bakery tool').setOrigin(0.5, 1);
        this.add(this.toolSprite);

        let tableX = 80;
        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.tableSprite = this.scene.add.image(tableX, 0, 'assets', 'bakery table').setOrigin(0.5, 1);
        this.add(this.tableSprite);

        /**
         * @type {Phaser.GameObjects.Image}
         * @private
         */
        this.breadSprite = this.scene.add.image(tableX, -20, 'assets', 'breadOnTable').setOrigin(0.5, 1);
        this.add(this.breadSprite);

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.flourIcon = this.scene.add.image(0, -100, 'assets', 'flour');
        this.flourIcon.setAlpha(0);
        this.add(this.flourIcon);

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.fireEffect = this.scene.add.image(2, -21, 'assets', 'fire');
        this.fireEffect.setAlpha(0.5);
        this.add(this.fireEffect);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Bakery';

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
            offsetY: -100
        });
        this.healthbar.setPercent(0);
        this.healthbar.hide();

        /**
         * @type {number}
         */
        this.queue = 0;

        this.scene.tweens.add({
            targets: this.flourIcon,
            duration: 500,
            alpha: 1,
            yoyo: true,
            repeat: Infinity
        });

        this.scene.tweens.add({
            targets: this.fireEffect,
            duration: 500,
            alpha: 1,
            yoyo: true,
            repeat: Infinity
        });
    }

    preUpdate () {
        if (this.queue > 0) {
            if (!this.loopTimeout) {
                let tick = 10;
                let percent = 0;
                this.healthbar.show();
                let interval = setInterval(() => {
                    let value = 100 / (GameConfig.BakeryLoop / tick);
                    percent += value;
                    this.healthbar.setPercent(percent);
                    if (percent >= 100) {
                        clearInterval(interval);
                    }
                }, tick);
                this.loopTimeout = setTimeout(() => {
                    this._loop();
                }, GameConfig.BakeryLoop);
            }

            this.flourIcon.setVisible(false);
            this.fireEffect.setVisible(true);
        } else {
            this.flourIcon.setVisible(true);
            this.fireEffect.setVisible(false);
        }
    }

    interact () {
        if (!this.scene.playerCharacter.pickedItem || this.scene.playerCharacter.pickedItem.getName() !== 'Flour') return;

        let item = this.scene.playerCharacter.pickedItem;
        this.scene.playerCharacter.putDown(true);
        item.destroy();
        this.queue++;
    }

    getInteractText () {
        return this._name;
    }

    _loop () {
        this.queue--;
        this._flushBread();
        clearTimeout(this.loopTimeout);
        this.loopTimeout = null;
        this.healthbar.hide();
    }

    _flushBread () {
        for (let i = 0; i < 1; i++) {
            let item = new Bread(this.scene, this.x, this.y);
            item.explode();
            this.scene.gameEnvironment.items.add(item);
        }
    }
}
