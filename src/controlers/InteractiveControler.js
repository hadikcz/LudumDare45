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
            console.log(nearestInteractiveItem);
            nearestInteractiveItem.interact();
        }
    }
}
