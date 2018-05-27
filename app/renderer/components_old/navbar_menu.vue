<template>
    <ul id="navbar-menu" class="dropdown-content">
        <template v-if="!editMode">
            <li class="unselectable-text menu-button"><a :href="'#tab0'" @click="selected($event,'run-suite')">Run Suite</a></li>
            <li class="unselectable-text menu-button"><a :href="'#tab1'" @click="selected($event,'stop-suite')">Stop Suite</a></li>
        </template>
        <template v-else>
            <li :class="{ disabled: !canAddSuite }" class="unselectable-text menu-button"><a :href="'#tab0'" @click="selected($event,'add-suite',!canAddSuite)">Add Suite</a></li>
            <li :class="{ disabled: !canDeleteSuite }" class="unselectable-text menu-button"><a :href="'#tab1'" @click="selected($event,'delete-suite',!canDeleteSuite)">Delete Suite</a></li>
        </template>
        <li class="divider"/>
        <li class="unselectable-text menu-button"><a class="modal-trigger" href="#config-modal">Configuration</a></li>
        <li class="unselectable-text menu-button">
            <about/>
        </li>
    </ul>
</template>
<script>
"use strict";

const About = require('./about.vue');

module.exports = {
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
        suites() {
            return this.$store.getters.suites;
        },
        editMode() {
            return this.$store.state.editMode;
        },
        canAddSuite() {
            return this.$store.getters.canAddSuite;
        },
        canDeleteSuite() {
            return this.suites.length > 1;
        }
    }
};
</script>

<style lang="scss" scoped>
#navbar-menu {
    width: 118px !important;
}

#navbar-menu-button {
    cursor: default;
}

.menu-button > a {
    cursor: default;
}

.menu-button {
    &.disabled {
        background-color: #ababab;
        a {
            background-color: transparent;
            color: #5f9ea0;
        }
        &:hover {
            background-color: #ababab;
        }
    }
}
</style>
