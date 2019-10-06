import Depths from 'structs/Depths';
import Bucket from 'entity/items/Bucket';

export default class WellBuilding extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'well');
        this.scene.add.existing(this);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Well';

        this.setOrigin(0.5, 1);
        this.setDepth(Depths.WELL);
    }

    interact () {
        if (this.scene.playerCharacter.pickedItem !== null) return;
        let bucket = new Bucket(this.scene, this.x, this.y);
        bucket.explode();
        this.scene.gameEnvironment.items.add(bucket);
    }

    getInteractText () {
        return this._name;
    }
}
