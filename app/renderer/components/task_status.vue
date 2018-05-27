<template>
    <spinner v-if="isRunning" />
    <span v-else class="icon is-medium">
        <i :class="['fas', 'fa-lg', status]"/>
    </span>
</template>


<script>
"use strict";

const TaskStatus = require('../../common/task_status');

const components = {
    "spinner": require('./common/spinner.vue')
};

module.exports = {
    props: ["status"],
    components: components,
    computed: {
        isRunning() {
            return this.status === TaskStatus.running;
        }
    }
};
</script>
