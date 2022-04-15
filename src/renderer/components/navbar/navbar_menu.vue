<template>
<dropdown-menu open-event="showNavbarMenu" class="navbar-dropdown-menu">
    <template v-for="(item, i) in options">
        <hr v-if="item.value==='divider'" class="dropdown-divider" :key="`${i}_divider`">
        <a v-else-if="item.disabled" class="dropdown-item disabled" :key="`${i}_disabled`">
            {{item.name}}
        </a>
        <a v-else class="dropdown-item" @click.prevent="onClick(item.value)" :key="`${i}_enabled`">
            {{item.name}}
        </a>
</template>
</dropdown-menu>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import DropdownMenu from '../common/dropdown_menu.vue';

type MenuOption = {
    name ? : string;
    value: string;
    disabled ? : boolean;
}


export default defineComponent({
    components: {
        "dropdown-menu": DropdownMenu
    },
    computed: {
        options() {
            const defaultOptions: Array < MenuOption > = [{
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
});
</script>


<style lang="scss">

</style>
