<template>
    <dropdown-menu open-event="showNavbarMenu" class="navbar-dropdown-menu">
        <template v-for="(item, i) in options">
            <hr v-if="item.value==='divider'" class="dropdown-divider" :key="i">
            <a v-else-if="item.disabled" class="dropdown-item disabled" :key="i">
                {{item.name}}
            </a>
            <a v-else class="dropdown-item" @click.prevent="onClick(item.value)" :key="i">
                {{item.name}}
            </a>
        </template>
    </dropdown-menu>
</template>


<script>
"use strict";

const components = {
    "dropdown-menu": require('../common/dropdown_menu.vue')
};

module.exports = {
    components: components,
    computed: {
        options() {
            const defaultOptions = [{
                name: "Settings",
                value: "settings"
            }, {
                name: "About",
                value: "about"
            }, {
                value: "divider"
            }, {
                name: "Quit",
                value: "quit"
            }];
            return defaultOptions;
        }
    },
    methods: {
        onClick(value) {
            this.$emit("select", value);
        }
    }
};
</script>


<style lang="scss">

</style>
