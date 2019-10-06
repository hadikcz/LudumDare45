import AbstractItem from 'entity/items/AbstractItem';

export default class HarvestedCrop extends AbstractItem {
    constructor (scene, x, y) {
        super(scene, x, y, 'coin1', 'Coin');
        this.body.setCircle(12, 0, -12);
        this.setScale(3);

        /**
         * @type {number}
         * @private
         */
        this._price = 1;
    }
}
