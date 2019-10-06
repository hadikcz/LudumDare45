import Depths from 'structs/Depths';

export default class HarvestedCrop extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'Crops');
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setDepth(Depths.CROP);

        this.body.setDrag(10, 10);
        this.body.setCircle(12, 0, -12);
        this.body.setCollideWorldBounds(true);
        this.body.setFriction(0.6);
    }

    explode (initY = false) {
        if (!initY) {
            initY = Phaser.Math.RND.integerInRange(-400, -150);
        }
        this.body.setVelocity(
            Phaser.Math.RND.integerInRange(-60, 60),
            Phaser.Math.RND.integerInRange(initY - 50, initY + 50)
        );

        this.body.angularVelocity = Phaser.Math.RND.integerInRange(0, 100);
    }

    preUpdate () {
        if (this.body.touching.down) {
            this.body.setAngularDrag(150);
            this.body.setDrag(30, 10);
            // this.body.setAngularVelocity(0);
        }
    }
}
