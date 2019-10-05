export default class TestEntity extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'Character');
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.body.setVelocity(5, 0);
    }
}
