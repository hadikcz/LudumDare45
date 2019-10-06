import AbstractItem from 'entity/items/AbstractItem';

export default class HarvestedCrop extends AbstractItem {
    constructor (scene, x, y) {
        super(scene, x, y, 'coin1', 'Coin');
        this.body.setCircle(12, 0, -12);
        this.setScale(1.5);
        /**
         * @type {number}
         * @private
         */
        this._price = 1;
    }

    interact () {
        this.scene.soundManager.coins.play();
        this.scene.updateCoins(1);
        this.destroy();
    }
}
