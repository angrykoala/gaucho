<template>
    <div v-click-away="away" :class="{'is-active': show}" class="dropdown is-right is-pulled-right">
        <div class="dropdown-menu" role="menu">
            <div class="dropdown-content" @click="away">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import {
    defineComponent
} from 'vue';


import { mixin as VueClickAway } from "vue3-click-away";
// const EventHandler = require('../../event_handler');


export default defineComponent({
    props: ["openEvent"],
    mixins: [VueClickAway],
    data() {
        return {
            show: false
        };
    },
    beforeMount() {
        // EventHandler.on(this.openEvent, this.showMenu);
    },
    beforeDestroy() {
        // EventHandler.off(this.openEvent);
    },
    methods: {
        showMenu() {
            this.show = !this.show;
        },
        away() {
            this.show = false;
        }
    }
});
</script>


<style lang="scss" scoped>
.dropdown-menu {
    min-width: 6rem;
    margin-right: 3px;
    top: 80%;
}
</style>
