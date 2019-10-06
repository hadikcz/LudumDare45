import Depths from 'structs/Depths';
import BuildingsAndItemsStates from 'structs/BuildingsAndItemsStates';
import BuildingStatesTiming from 'structs/BuildingStatesTiming';
import ProgressBarUI from 'ui/ProgressBarUI';
import HarvestedCrop from 'entity/items/HarvestedCrop';

export default class Grain extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'Grain');
        this.scene.add.existing(this);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Wheat';

        /**
         * @type {string}
         */
        this.state = null;

        /**
         * @type {Phaser.Time.TimerEvent}
         * @private
         */
        this._timeEventWaitForWater = null;

        /**
         * @type {Field}
         */
        this.field = null;

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.waterDropletImage = this.scene.add.image(this.x, this.y - 90, 'assets', 'waterDroplet');
        this.waterDropletImage.setAlpha(0);

        /**
         * @type {Phaser.GameObjects.Image}
         */
        this.scytheImage = this.scene.add.image(this.x, this.y - 90, 'assets', 'Scythe');
        this.scytheImage
            .setAlpha(0)
            .setScale(0.5);

        // this.scene.add.image(this.x, this.y - 100, 'assets', 'progress_bar_inner');

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
            offsetY: -60
        });
        this.healthbar.setPercent(0);

        // this.add(this.healthbar.bgImage);
        // this.add(this.healthbar.barImage);
        this.healthbar.show();

        this._stateStartGrowing();
        this.tint = 0x00FF00;
        this.setOrigin(0.5, 1);
        this.setDepth(Depths.GRAIN);
    }

    preUpdate () {
        // this.healthbar.preUpdate();
    }

    setField (field) {
        this.field = field;
    }

    _stateStartGrowing () {
        this.state = BuildingsAndItemsStates.GRAIN.GROWING;
        this.scene.time.addEvent({
            delay: BuildingStatesTiming.GRAIN.GROWING,
            callbackScope: this,
            callback: this._stateToGrowedWaitingForWater
        });

        this.setScale(1, 0);
        this.scene.tweens.add({
            targets: this,
            duration: BuildingStatesTiming.GRAIN.GROWING,
            scaleY: 1
        });

        let percent = 0;
        let tick = 10;
        let interval = setInterval(() => {
            let value = 100 / (BuildingStatesTiming.GRAIN.GROWING / tick);
            percent += value;
            this.healthbar.setPercent(percent);
            if (percent >= 100) {
                clearInterval(interval);
            }
        }, tick);
    }

    _stateToGrowedWaitingForWater () {
        this.state = BuildingsAndItemsStates.GRAIN.GROWED_WAITING_FOR_WATER;
        this.healthbar.barImage.tint = 0xf8d100;
        this.tint = 0xFFFFFF;
        this._timeEventWaitForWater = this.scene.time.addEvent({
            delay: BuildingStatesTiming.GRAIN.GROWED_WAITING_FOR_WATER,
            callbackScope: this,
            callback: this._die
        });

        this.scene.tweens.add({
            targets: this.waterDropletImage,
            duration: 500,
            alpha: 1,
            yoyo: true,
            repeat: Infinity
        });

        let percent = 100;
        let tick = 10;
        this.waterBeforeDieInterval = setInterval(() => {
            let value = 100 / (BuildingStatesTiming.GRAIN.GROWED_WAITING_FOR_WATER / tick);
            percent -= value;
            this.healthbar.setPercent(percent);
            if (percent <= 0) {
                clearInterval(this.waterBeforeDieInterval);
            }
        }, tick);
    }

    interact () {
        if (this.state === BuildingsAndItemsStates.GRAIN.GROWED_WAITING_FOR_WATER /* && this.scene.playerCharacter.activeItem === 'bucketWithWater' */) {
            this._interactWaterThePlant();
        } else if (this.state === BuildingsAndItemsStates.GRAIN.GROWED /* && this.scene.playerCharacter.activeItem === 'scythe' */) {
            this._interactHarvest();
        } else if (this.state === BuildingsAndItemsStates.GRAIN.DEAD) {
            this.destroy();
        }
    }

    _interactWaterThePlant () {
        if (this.state !== BuildingsAndItemsStates.GRAIN.GROWED_WAITING_FOR_WATER) return;
        if (!this.scene.playerCharacter.pickedItem || this.scene.playerCharacter.pickedItem.getName() !== 'Bucket') return;

        let bucket = this.scene.playerCharacter.pickedItem;
        this.scene.playerCharacter.putDown(true);
        bucket.destroy();

        this.waterDropletImage.destroy();
        clearInterval(this.waterBeforeDieInterval);

        this._timeEventWaitForWater.destroy();
        this.state = BuildingsAndItemsStates.GRAIN.WAIT_BEFORE_ITS_READY_TO_TAKE_AFTER_WATER;

        let percent = 0;
        let tick = 10;
        let interval = setInterval(() => {
            let value = 100 / (BuildingStatesTiming.GRAIN.WAIT_BEFORE_ITS_READY_TO_TAKE_AFTER_WATER / tick);
            percent += value;
            this.healthbar.setPercent(percent);
            if (percent >= 100) {
                clearInterval(interval);
            }
        }, tick);

        this._timeEventWaitForPickUp = this.scene.time.addEvent({
            delay: BuildingStatesTiming.GRAIN.WAIT_BEFORE_ITS_READY_TO_TAKE_AFTER_WATER,
            callbackScope: this,
            callback: this._waitForHarvest
        });
    }

    _waitForHarvest () {
        this.state = BuildingsAndItemsStates.GRAIN.GROWED;
        this.scene.tweens.add({
            targets: this.scytheImage,
            duration: 500,
            alpha: 1,
            yoyo: true,
            repeat: Infinity
        });

        let percent = 100;
        let tick = 10;
        let interval = setInterval(() => {
            let value = 100 / (BuildingStatesTiming.GRAIN.GROWED_WAIT_FOR_DEAD / tick);
            percent -= value;
            this.healthbar.setPercent(percent);
            if (percent <= 0) {
                clearInterval(interval);
            }
        }, tick);

        this._timeEventWaitForPickUp = this.scene.time.addEvent({
            delay: BuildingStatesTiming.GRAIN.GROWED_WAIT_FOR_DEAD,
            callbackScope: this,
            callback: this._die
        });
    }

    _interactHarvest () {
        if (this.state !== BuildingsAndItemsStates.GRAIN.GROWED) return;

        this._timeEventWaitForPickUp.destroy();
        this.state = BuildingsAndItemsStates.GRAIN.HARVESTED;

        let initY = Phaser.Math.RND.integerInRange(-400, -300);
        for (let i = 0; i < Phaser.Math.RND.integerInRange(2, 4); i++) {
            let crop = new HarvestedCrop(this.scene, this.x, this.y);
            crop.explode(initY);
            this.scene.gameEnvironment.items.add(crop);
        }
        this.destroy(true);
    }

    getInteractText () {
        if (this.state === BuildingsAndItemsStates.GRAIN.GROWED_WAITING_FOR_WATER) {
            if (this.scene.playerCharacter.pickedItem && this.scene.playerCharacter.pickedItem.getName() === 'Bucket') {
                return 'Water the plant';
            } else {
                return 'Water the plant (Need bucket)';
            }
        } else if (this.state === BuildingsAndItemsStates.GRAIN.GROWED) {
            return 'Harvest the plant';
        } else if (this.state === BuildingsAndItemsStates.GRAIN.DEAD) {
            return 'Harvest dead plant';
        }
        return this._name;
    }

    _die () {
        this.state = BuildingsAndItemsStates.GRAIN.DEAD;
        this.tint = 0xAAAAAA;
        this.scytheImage.destroy();
        this.waterDropletImage.destroy();
    }

    destroy () {
        this.field.clean();
        this.healthbar.destroy();
        this.scytheImage.destroy();
        this.waterDropletImage.destroy();
        super.destroy();
    }
}
