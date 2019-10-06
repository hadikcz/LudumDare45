export default class PlayerCharacterControls {
    /**
     * @param {GameScene} scene
     * @param {PlayerCharacter} playerCharacter
     */
    constructor (scene, playerCharacter) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {PlayerCharacter}
         * @private
         */
        this.playerCharacter = playerCharacter;

        /**
         * @type {{left: Phaser.Input.Keyboard.Key, right2: Phaser.Input.Keyboard.Key, action: Phaser.Input.Keyboard.Key, left2: Phaser.Input.Keyboard.Key, right: Phaser.Input.Keyboard.Key, action2: Phaser.Input.Keyboard.Key}}
         */
        this.keys = {
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            up2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            left2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            right2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            action: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            action2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        };
    }

    update () {
        let click = false;
        if (this.keys.left.isDown || this.keys.left2.isDown) {
            this.playerCharacter.moveTo('left');
            click = true;
        } else if (this.keys.right.isDown || this.keys.right2.isDown) {
            this.playerCharacter.moveTo('right');
            click = true;
        }

        if (this.keys.up.isDown || this.keys.up2.isDown) {
            this.playerCharacter.moveTo('jump');
            click = true;
        }
        if (!click) {
            this.playerCharacter.moveTo('stopX');
        }
    }
}
