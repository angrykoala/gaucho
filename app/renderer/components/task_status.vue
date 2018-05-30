<template>
    <div class="spinner-container" v-if="isRunning" >
        <spinner/>
    </div>
    <span v-else class="icon is-medium has-text-centered">
        <i :class="['fas', 'fa-lg', status, statusColor]"/>
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
        },
        statusColor() {
            switch (this.status) {
                case TaskStatus.idle:
                case TaskStatus.stopped:
                    return "has-text-grey-dark";
                case TaskStatus.error:
                    return "has-text-danger";
                case TaskStatus.running:
                    return "has-text-info";
                case TaskStatus.ok:
                    return "has-text-success";
                default:
                    return "has-text-grey-light";
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.spinner-container{
    margin-top: 4px;
    margin-left: 2px;
}
</style>
