export default class InteractiveControler {
    /**
     * @param {GameScene} scene
     * @param {PlayerCharacter} playerCharacter
     */
    constructor (scene, playerCharacter) {
        /**
         * @type {GameScene}
         * @private
         */
        this.scene = scene;

        /**
         * @type {PlayerCharacter}
         * @private
         */
        this.playerCharacter = playerCharacter;
    }

    interact () {
        let nearestInteractiveItem = this.playerCharacter.getNearestInteractiveItem();
        if (nearestInteractiveItem) {
            nearestInteractiveItem.interact();
        } else {
            console.log('build');
            if (true) {
                this.playerCharacter.lockMovementWhileOpenShop();
                this.scene.ui.buildMenuUI.show();
                // this.scene.buildControler.buildGrainField();
            }
        }
    }
}
