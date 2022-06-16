<template>
<main class="theme-classic">
    <!-- <div class="main-view" v-if="!settingsMenu">
        <navbar></navbar>
        <suite v-for="(suite, index) of suites" v-show="selectedSuite===index" v-if="editMode || selectedSuite===index" :key="index" :suite="index"></suite>
        <bottom-bar v-if="showBottomBar"></bottom-bar>
    </div>
    <settings-menu v-else /> -->
    <navbar> </navbar>
    <suite v-for="(suite, index) of suites" v-show="selectedSuite===index" :key="index" :suite="suite"></suite>
    <bottom-bar></bottom-bar>
</main>
</template>


<script lang="ts">
import {
    defineComponent
} from 'vue';

import BottomBar from "./components/bottom_bar/bottom_bar.vue";
import NavBar from "./components/navbar/navbar.vue";
import Suite from "./components/suite/suite.vue";

export default defineComponent({
    data() {
        return {
            selectedSuite: 0
        }
    },
    components: {
        "bottom-bar": BottomBar,
        "navbar": NavBar,
        "suite": Suite
    },
    computed: {
        suites() {
            return [{
                tasks: [{
                    name: "task1"
                }, {
                    name: "task2"
                }]
            }]
        },
    },
    methods: {
        onClick() {
            console.log("ON CLICK")
        }
    }
});
</script>
