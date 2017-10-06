/* globals swal */
"use strict";
const {
    shell
} = require('electron');

const AppStatus = require('../app_status');

module.exports = {
    props: ['suites'],
    data() {
        return {
            version: AppStatus.version,
            canOpenLink: true
        };
    },
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
        <li class="unselectable-text menu-button"><a class="modal-trigger" href="#config-modal">Configuration</a></li>
        <li class="unselectable-text menu-button"><a class="modal-trigger" v-on:click="openAbout">About</a></li>
    </ul>
    `,
    methods: {
        openAbout() {
            swal({
                title: '<h4>Gaucho</h4>',
                html:
                '<p>Version: ' + AppStatus.version + ' </p></br>' +
                '<i>by @angrykoala</i></br>' +
                '<p>Gaucho is Open Source software licensed under GNU GPL V3, it can be downloaded for free at:</br>' +
                '<a v-on:click="openLink" href="#">https://github.com/angrykoala/gaucho</a></p>',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonColor: "#ee6e73",
                confirmButtonText: '<i class="material-icons">thumb_up</i> Great!'
            });
        },
        selected(ev, selection, ignoreSelection) {
            if (!ignoreSelection) {
                this.$emit("selection", selection);
            } else {
                this.invalidClick(ev);
            }
        },
        invalidClick(ev) {
            ev.stopPropagation();
        },
        openLink() {
            if (this.canOpenLink) {
                this.canOpenLink = false;
                shell.openExternal('https://github.com/angrykoala/gaucho', {}, (err) => {
                    if (err) console.error(err);
                this.canOpenLink = true;
            });
            }
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
