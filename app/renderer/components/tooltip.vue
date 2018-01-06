<template>
<div class="tooltip">
    <div class="tooltip-text">
        {{ status }}
    </div>
</div>
</template>

<script>
"use strict";

const TaskStatus = require('../../common/task_status');

module.exports = {
    props: ['taskStatus'],
    computed: {
        status() {
            switch (this.taskStatus) {
                case TaskStatus.idle:
                case TaskStatus.stopped:
                    return "Stopped";
                case TaskStatus.error:
                    return "Error";
                case TaskStatus.running:
                    return "Running";
                case TaskStatus.ok:
                    return "OK";
                default:
                    return this.taskStatus;
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.tooltip {
    .tooltip-text {
        position: absolute;
        background-color: black;
        color: white;
        text-align: center;
        z-index: 997;
        bottom: 40px;
        right: 0;
        border-radius: 3px;
        padding: 0 10px;
        opacity: 0;
        transition: opacity 0.5s ease;
        visibility: hidden;
        &::after {
            content: '';
            position: absolute;
            top: 100%;
            right: 10px;
            border-width: 5px;
            border-style: solid;
            border-color: black transparent transparent;
        }
    }
    &:hover {
        .tooltip-text {
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>
