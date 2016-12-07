"use strict";

module.exports = {
    template: `
    <ul id='navbar-menu' class='dropdown-content'>
        <h5 v-on:click="invalidClick" class="center-align menu-title">Suite</h5>
        <li class="divider"></li>
        <li><a v-on:click="selected('run-suite')">Run</a></li>
        <li><a v-on:click="selected('stop-suite')">Stop</a></li>
        <li><a v-on:click="selected('add-suite')">Add New</a></li>
        <li><a v-on:click="selected('delete-suite')">Delete</a></li>
        <li class="divider"></li>
    </ul>
    `,
    methods: {
        selected(selection){
            this.$emit("selection",selection);    
        },
        invalidClick(ev){
            ev.stopPropagation();
        }
    }
};
