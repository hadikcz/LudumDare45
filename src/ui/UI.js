import $ from 'jquery';
import Phaser from 'phaser';
import BuildMenuUI from 'ui/BuildMenuUI';

export default class UI {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor (scene) {
        /**
         * @type {Phaser.Scene}
         */
        this.scene = scene;

        /**
         * @type {*|jQuery|HTMLElement}
         */
        this.coinSelector = $('.coins');

        /**
         * @type {BuildMenuUI}
         */
        this.buildMenuUI = new BuildMenuUI(this.scene);

        /**
         * @type {boolean}
         */
        this.skippedTutorial = false;
    }

    skipTutorial () {
        if (this.skippedTutorial) return;
        this.skippedTutorial = true;
        $('.tutorial').fadeOut(500);
        $('.tutorial-fade').fadeOut(500);
    }

    hide () {
        $('#ui').hide();
    }

    show () {
        $('#ui').show();
    }
}
