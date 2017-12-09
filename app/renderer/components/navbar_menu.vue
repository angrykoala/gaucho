<template>
<ul id='navbar-menu' class='dropdown-content'>
    <template v-if="!editMode">
            <li class="unselectable-text menu-button"><a v-on:click="selected($event,'run-suite')" v-bind:href="'#tab0'">Run Suite</a></li>
            <li class="unselectable-text menu-button"><a v-on:click="selected($event,'stop-suite')" v-bind:href="'#tab1'">Stop Suite</a></li>
        </template>
    <template v-else>
            <li class="unselectable-text menu-button" v-bind:class="{ disabled: !canAddSuite }"><a v-on:click="selected($event,'add-suite',!canAddSuite)" v-bind:href="'#tab0'">Add Suite</a></li>
            <li class="unselectable-text menu-button" v-bind:class="{ disabled: !canDeleteSuite }"><a v-on:click="selected($event,'delete-suite',!canDeleteSuite)" v-bind:href="'#tab1'">Delete Suite</a></li>
        </template>
    <li class="divider"></li>
    <li class="unselectable-text menu-button"><a class="modal-trigger" href="#config-modal">Configuration</a></li>
    <li class="unselectable-text menu-button">
        <about></about>
    </li>
</ul>
</template>
<script>
"use strict";

const AppStatus = require('../app_status');
const About = require('./about.vue');

module.exports = {
    props: ['suites'],
    components: {
        "about": About
    },
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
            return this.$store.state.editMode;
        },
        canAddSuite() {
            return this.suites.length < AppStatus.maxSuites;
        },
        canDeleteSuite() {
            return this.suites.length > 1;
        }
    }
};
</script>
