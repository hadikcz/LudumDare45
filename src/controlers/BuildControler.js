import Grain from 'entity/buildings/Grain';
import Buildings from 'structs/Buildings';
import MillBuilding from 'entity/buildings/MillBuilding';
import BakeryBuilding from 'entity/buildings/BakeryBuilding';

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

    buildById (id) {
        let building = null;
        switch (id) {
            case 1:
                building = new Grain(this.scene, this.playerCharacter.x, this.gameEnvironment.getGroundDimensionY());
                break;
            case 2:
                building = new MillBuilding(this.scene, this.playerCharacter.x, this.gameEnvironment.getGroundDimensionY());
                break;
            case 3:
                building = new BakeryBuilding(this.scene, this.playerCharacter.x, this.gameEnvironment.getGroundDimensionY());
                break;
        }

        if (building) {
            this.gameEnvironment.addNewBuilding(building);
        }
    }
}
