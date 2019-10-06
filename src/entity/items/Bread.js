import AbstractItem from 'entity/items/AbstractItem';

export default class Bread extends AbstractItem {
    constructor (scene, x, y) {
        super(scene, x, y, 'bread', 'bread');

        /**
         * @type {number}
         * @private
         */
        this._price = 15;
    }
}
