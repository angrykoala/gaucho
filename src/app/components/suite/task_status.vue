<template>
    <div v-if="status===TaskStatus.running" class="spinner-container" >
        <spinner/>
    </div>
    <div v-else-if="status===TaskStatus.idle || status===TaskStatus.stopped">
        <span class="icon is-medium has-text-centered">
            <i class="fas fa-lg fa-pause-circle"/>
        </span>
    </div>
    <div v-else-if="status===TaskStatus.error">
        <span class="icon is-medium has-text-centered">
            <i class="fas fa-lg fa-exclamation-circle has-text-danger"/>
        </span>
    </div>
    <div v-else-if="status===TaskStatus.ok">
        <span class="icon is-medium has-text-centered">
            <i class="fas fa-lg fa-check-circle has-text-success"/>
        </span>
    </div>
    <div v-else-if="status===TaskStatus.scheduled">
        <span class="icon is-medium has-text-centered">
            <i class="fas fa-lg fa-clock"/>
        </span>
    </div>
</template>

<script>
"use strict";

const TaskStatus = require('../../../common/task_status');

const components = {
    "spinner": require('../common/spinner.vue')
};

module.exports = {
    props: ["status"],
    components: components,
    data() {
        return {
            TaskStatus: TaskStatus
        };
    },
    computed: {
        isRunning() {
            return this.status === TaskStatus.running;
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
