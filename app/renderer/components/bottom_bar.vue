<template>
<div class="bottom-bar unselectable-text">
    <nav class="navbar navbar-inverse">
        <div class="left-content">
            <b>Total Tasks:</b> {{totalTasks}}
        </div>
        <div class="right-content">
            <b>Running Tasks:</b> {{AppStatus.runningTasks}}
        </div>
    </nav>
</div>
</template>

<script>
"use strict";

const AppStatus = require('../app_status');

module.exports = {
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    computed: {
        totalTasks() {
            return this.$store.getters.totalTasks;
        }
    }
};
</script>
