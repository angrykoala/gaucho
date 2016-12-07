"use strict";

const AppStatus = require('../app_status');


module.exports = {
    template: `
    <ul id='navbar-menu' class='dropdown-content'>
      <li><a v-on:click="selected('run-suite')">Run Suite</a></li>
      <li><a v-on:click="selected('stop-suite')">Stop Suite</a></li>
      <li class="divider"></li>
      <li><a v-on:click="selected('create-suite')">Create New Suite</a></li>
      <li><a v-on:click="selected('delete-suite')">Delete Current Suite</a></li>
    </ul>
    `,
    methods: {
        selected(selection){
            AppStatus.events.emit(selection);
            
        }
    }

};
