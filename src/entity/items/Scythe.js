import AbstractItem from 'entity/items/AbstractItem';

export default class Scythe extends AbstractItem {
    constructor (scene, x, y) {
        super(scene, x, y, 'Scythe', 'Scythe');
        this.body.setCircle(12, 0, -12);
    }
}
