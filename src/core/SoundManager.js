export default class SoundManager {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
        * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {Phaser.Sound.BaseSound}
         */
        this.coins = this.scene.sound.add('coins');
        this.harvest = this.scene.sound.add('harvest');
        this.waterPlant = this.scene.sound.add('waterPlant');
        this.take = this.scene.sound.add('take');
        this.plantSeed = this.scene.sound.add('plantSeed');
        this.coinsReward = this.scene.sound.add('coinsReward');
    }
}
