import Grain from 'entity/Grain';

export default class BuildControler {
    /**
     * @param {GameScene} scene
     * @param {PlayerCharacter} playerCharacter
     * @param {GameEnvironment} gameEnvironment
     */
    constructor (scene, playerCharacter, gameEnvironment) {
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

        /**
         * @type {GameEnvironment}
         * @private
         */
        this.gameEnvironment = gameEnvironment;
    }

    buildGrainField () {
        let grain = new Grain(this.scene, this.playerCharacter.x, this.gameEnvironment.getGroundDimensionY());
        this.gameEnvironment.addNewBuilding(grain);
    }
}
