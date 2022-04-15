<template>
<main class="theme-classic">
    <!-- <div class="main-view" v-if="!settingsMenu">
        <navbar></navbar>
        <suite v-for="(suite, index) of suites" v-show="selectedSuite===index" v-if="editMode || selectedSuite===index" :key="index" :suite="index"></suite>
        <bottom-bar v-if="showBottomBar"></bottom-bar>
    </div>
    <settings-menu v-else /> -->
    <navbar> </navbar>
    <bottom-bar></bottom-bar>
</main>
</template>


<script lang="ts">
import {
    defineComponent
} from 'vue';

import BottomBar from "./components/bottom_bar/bottom_bar.vue";
import NavBar from "./components/navbar/navbar.vue";

export default defineComponent({
    components: {
        "bottom-bar": BottomBar,
        "navbar": NavBar
    },
    methods: {
        onClick() {
            console.log("ON CLICK")
        }
    }
});
</script>
