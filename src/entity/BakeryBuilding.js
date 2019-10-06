import Depths from 'structs/Depths';

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
        this.breadSprite = this.scene.add.image(tableX, -20, 'assets', 'bread').setOrigin(0.5, 1);
        this.add(this.breadSprite);
    }

    getInteractText () {
        return 'Bakery';
    }
}
