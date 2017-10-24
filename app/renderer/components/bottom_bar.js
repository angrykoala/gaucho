"use strict";

const AppStatus = require('../app_status');
const ContextMenu = require('./context_menu');


module.exports = {
    components: {
        "context-menu": ContextMenu
    },
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    template: `
    <div class="bottom-bar unselectable-text">
        <context-menu ref="menu"></context-menu>
        <nav class="navbar navbar-inverse" v-on:contextmenu.prevent="$refs.menu.openContextMenu">
            <div class="left-content">
                <b>Total Tasks:</b> {{AppStatus.totalTasks}}
            </div>
            <div class="right-content">
                <b>Running Tasks:</b> {{AppStatus.runningTasks}}
            </div>
        </nav>
    </div>
    `
};
