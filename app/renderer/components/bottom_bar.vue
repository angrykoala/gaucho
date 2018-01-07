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


<style lang="scss" scoped>
.left-content {
    float: left;
    padding-left: 20px;
    width: 50%;
}

.right-content {
    float: right;
    padding-right: 20px;
}

.bottom-bar>.navbar {
    height: 56px;
    line-height: 56px;
}

</style>
