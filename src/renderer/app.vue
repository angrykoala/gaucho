<template>
<main>
    <p> Hello world</p>
    <!-- <div class="main-view" v-if="!settingsMenu">
        <navbar></navbar>
        <suite v-for="(suite, index) of suites" v-show="selectedSuite===index" v-if="editMode || selectedSuite===index" :key="index" :suite="index"></suite>
        <bottom-bar v-if="showBottomBar"></bottom-bar>
    </div>
    <settings-menu v-else /> -->
</main>
</template>


<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    methods: {
        onClick() {
            console.log("ON CLICK")
        }
    }
});
</script>
