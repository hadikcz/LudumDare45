import AbstractItem from 'entity/items/AbstractItem';

export default class HarvestedCrop extends AbstractItem {
    constructor (scene, x, y) {
        super(scene, x, y, 'Bucket', 'Bucket');

        this.body.setDrag(70, 70);
        // this.body.setCircle(12, 0, -12);
    }
}
