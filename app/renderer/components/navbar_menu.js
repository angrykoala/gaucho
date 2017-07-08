"use strict";

const AppStatus = require('../app_status');

module.exports = {
    props: ['suites'],
    template: `
    <ul id='navbar-menu' class='dropdown-content'>
        <template v-if="!editMode">
            <li class="unselectable-text menu-button"><a v-on:click="selected($event,'run-suite')">Run Suite</a></li>
            <li class="unselectable-text menu-button"><a v-on:click="selected($event,'stop-suite')">Stop Suite</a></li>
        </template>
        <template v-else>
            <li class="unselectable-text menu-button" v-bind:class="{ disabled: !canAddSuite }"><a v-on:click="selected($event,'add-suite',!canAddSuite)">Add Suite</a></li>
            <li class="unselectable-text menu-button" v-bind:class="{ disabled: !canDeleteSuite }"><a v-on:click="selected($event,'delete-suite',!canDeleteSuite)">Delete Suite</a></li>
        </template>
        <li class="divider"></li>
    </ul>
    `,
    methods: {
        selected(ev, selection, ignoreSelection) {
            if (!ignoreSelection) {
                this.$emit("selection", selection);
            } else {
                this.invalidClick(ev);
            }
        },
        invalidClick(ev) {
            ev.stopPropagation();
        }
    },
    computed: {
        editMode() {
            return AppStatus.editMode;
        },
        canAddSuite() {
            return this.suites.length < AppStatus.maxSuites;
        },
        canDeleteSuite() {
            return this.suites.length > 1;
        }
    }
};
