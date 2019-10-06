import Depths from 'structs/Depths';

export default class WellBuilding extends Phaser.GameObjects.Image {
    constructor (scene, x, y) {
        super(scene, x, y, 'assets', 'merchant');
        this.scene.add.existing(this);

        /**
         * @type {string}
         * @private
         */
        this._name = 'Merchant';

        this.setOrigin(0.5, 1);
        this.setDepth(Depths.MERCHANT);
    }

    interact () {
        if (this.scene.playerCharacter.pickedItem) {
            this._sell(this.scene.playerCharacter.pickedItem);
        }
    }

    getInteractText () {
        if (this.scene.playerCharacter.pickedItem) {
            return 'Sell - ' + this.scene.playerCharacter.pickedItem.getName();
        } else {
            return this._name + ' - Nothing to sell';
        }
    }

    _sell (item) {
        let price = item.getPrice();
        console.log('try sell xxx ' + price);
        if (price && price > 0) {
            console.log('item was sold for ' + price);
            // spawn coins
            // remove item from players
            this.scene.playerCharacter.putDown(true);
            item.destroy();
        }
    }
}
