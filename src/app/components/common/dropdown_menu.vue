<template>
    <div v-on-clickaway="away" :class="{'is-active': show}" class="dropdown is-right is-pulled-right">
        <div class="dropdown-menu" role="menu">
            <div class="dropdown-content" @click="away">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script>
"use strict";
const clickaway = require('vue-clickaway');
const EventHandler = require('../../event_handler');


module.exports = {
    props: ["openEvent"],
    mixins: [clickaway.mixin],
    data() {
        return {
            show: false
        };
    },
    beforeMount() {
        EventHandler.on(this.openEvent, this.showMenu);
    },
    beforeDestroy() {
        EventHandler.off(this.openEvent);
    },
    methods: {
        showMenu() {
            this.show = !this.show;
        },
        away() {
            this.show = false;
        }
    }
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
    min-width: 6rem;
    margin-right: 3px;
}
</style>
