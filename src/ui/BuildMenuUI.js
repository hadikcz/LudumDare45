import $ from 'jquery';
import Buildings from 'structs/Buildings';

export default class BuildMenuUI {
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {jQuery.fn.init|jQuery|HTMLElement}
         */
        this.selector = $('.build-menu');

        /**
         * @type {*|jQuery|HTMLElement}
         */
        this.selectorRowWrapper = $('.row-wrapper');

        /**
         * @type {number}
         */
        this.pointer = 0;

        this._render();
    }

    show () {
        this.pointer = 0;
        this._redrawPointer();
        this.selector.show();
    }

    hide () {
        this.scene.playerCharacter.unLockMovementWhileOpenShop();
        this.selector.hide();
    }

    moveUp () {
        if (this.pointer === 0) return;
        this.pointer--;
        this._redrawPointer();
    }

    moveDown () {
        if (this.pointer > this.selectorRowWrapper.length) return;
        this.pointer++;
        this._redrawPointer();
    }

    actionSelect () {
        let id = $('#rowShop' + this.pointer).data('id');
        if (id) {
            let buildingData = Buildings.getBuildingById(id);
            if (buildingData) {
                if (buildingData.price <= this.scene.coins) {
                    this.scene.updateCoins(-buildingData.price);
                    this.scene.buildControler.buildById(id);
                    this.hide();
                } else {
                    this._showNoEnoughCoins();
                }
            }
        }
    }

    _redrawPointer () {
        $('.row').removeClass('active');
        $('#rowShop' + this.pointer).addClass('active');
    }

    _render () {
        this.selectorRowWrapper.html('');

        let i = 0;
        Buildings.list.forEach((building) => {
            this.selectorRowWrapper.append(`
                <div class="row" id="rowShop` + i++ + `" data-id="` + building.id + `">
                    ` + building.name + ` <div class="price">` + building.price + ` <div class="coin"></div></div>
                </div>
            `);
        });
    }

    _showNoEnoughCoins () {
        $('.not-enough-coins').fadeIn(400);
        setTimeout(() => {
            $('.not-enough-coins').fadeOut(400);
        }, 1000);
    }
}
