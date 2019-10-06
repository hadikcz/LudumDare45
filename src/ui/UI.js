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
    }

    show () {
        $('#ui').show();
    }
}
