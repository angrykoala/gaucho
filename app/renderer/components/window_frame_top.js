"use strict";

const {
    remote
} = require('electron');

module.exports = {
    data: () => {
        return {
            win: remote.BrowserWindow.getFocusedWindow()
        };
    },
    template: `
    <div class="window-frame-top">
        <div class="draggable-frame">
        </div>
        <div class="window-controls">
            <i class="tiny material-icons unselectable window-frame-button" v-on:click="onClose">close</i>
            <!--<i class="tiny material-icons unselectable window-frame-button" v-on:click="onMaximize">crop_square</i>-->
            <i class="tiny material-icons unselectable window-frame-button" v-on:click="onMinimize">remove</i>
        </div>
    </div>
    `,
    methods: {
        onClose() {
            this.win.close();
        },
        onMaximize() {
            // Currently not working
            if (!this.win.isMaximized()) {
                this.win.maximize();
            } else {
                this.win.unmaximize();
            }
        },
        onMinimize() {
            this.win.minimize();
        }
        //TODO: add
        //TODO: Add double click to maximize/minimize
    }
};
