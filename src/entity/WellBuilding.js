import Depths from 'structs/Depths';

export default class WellBuilding extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'well');
        this.scene.add.existing(this);

        this.setOrigin(0.5, 1);
        this.setDepth(Depths.WELL);
    }

    getInteractText () {
        return 'Well';
    }
}
