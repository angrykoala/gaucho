<template>
    <dropdown-menu open-event="showNavbarMenu" class="navbar-dropdown-menu">
        <template v-for="item in options">
            <hr v-if="item.value==='divider'" class="dropdown-divider">
            <a v-else class="dropdown-item" @click.prevent="onClick(item.value)">
                {{item.name}}
            </a>
        </template>
    </dropdown-menu>
</template>



<script>
"use strict";

const components = {
    "dropdown-menu": require('./common/dropdown_menu.vue')
};

module.exports = {
    components: components,
    computed: {
        options() {
            const defaultOptions = [{name: "Settings", value: "settings"}, {name: "About", value: "about"}];

            if(!this.$store.state.editMode) {
                const runModeOptions = [{name: "Run Suite", value: "runSuite"}, {name: "Stop Suite", value: "stopSuite"}];
                return runModeOptions.concat([{value: "divider"}], defaultOptions);
            } else{
                const editModeOptions = [{name: "Add Suite", value: "addSuite"}, {name: "Remove Suite", value: "removeSuite"}];
                return editModeOptions.concat([{value: "divider"}], defaultOptions);
            }

        }
    },
    methods: {
        onClick(value) {
            this.$emit("select", value);
        }
    }
};
</script>
