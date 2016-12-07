"use strict";

const AppStatus = require('../app_status');


module.exports = {
    template: `
    <ul id='navbar-menu' class='dropdown-content'>
      <li><a v-on:click="runAll">Run All</a></li>
      <li><a v-on:click="stopAll">Stop All</a></li>
      <li class="divider"></li>
      <li><a>three</a></li>
    </ul>
    `,
    methods: {
        runAll() {
            AppStatus.events.emit("run-suite",AppStatus.activeSuite);
        },
        stopAll() {
            AppStatus.events.emit("stop-suite",AppStatus.activeSuite);
        }

    }

};
