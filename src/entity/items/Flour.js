import AbstractItem from 'entity/items/AbstractItem';

export default class Flour extends AbstractItem {
    constructor (scene, x, y) {
        super(scene, x, y, 'flour', 'Flour');

        /**
         * @type {number}
         * @private
         */
        this._price = 5;
    }
}
