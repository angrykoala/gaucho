<template>
    <li class="run-card task-card">
        <div class="collapsible-header row unselectable-text" :class="{ 'edit-mode': editMode}">
            <div class="col s1" v-if="editMode">
                <i class="tiny material-icons">drag_handle</i>
            </div>
            <div class="col" :class="{ s4: editMode, s5: !editMode }">
                <strong class="truncate">{{task.title}}</strong>
            </div>
            <div class="col s3">
                <div class="truncate task-time" v-if="$store.state.userConfig.showTimer">{{executionTime}}</div>
            </div>
            <div class="col s3">
                <a v-if="editMode" class="waves-effect waves-light btn delete-button" @click="onDeleteClick">Delete</a>
                <a v-else class="waves-effect waves-light btn run-button" @click="toggleRun">{{running? "Stop" : "Run"}}</a>
            </div>
            <div class="col s1">
                <progress-spinner v-if="running && $store.state.userConfig.animatedSpinner"/>
                <i v-else class="small material-icons" :style="{color: statusColor}">{{task.status}}</i>
                <tooltip :task-status="task.status"/>
            </div>
        </div>

        <div class="collapsible-body task-card-body">
            <div v-if="!editMode" class="run-output">
                <pre>{{task.output}}</pre>
            </div>
            <div v-else class="container">
                <task-input :task="task" @save="saveTask"/>
            </div>
        </div>
    </li>
</template>

<script>
"use strict";

const AppStatus = require('../app_status');
const TaskStatus = require('../../common/task_status');

const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;
const Utils = require('../../common/utils');
const Materialize = require('../api/materialize');

const components = {
    "task-input": require('./task_input.vue'),
    "progress-spinner": require('./common/progress_spinner.vue'),
    "tooltip": require('./tooltip.vue')
};

module.exports = {
    props: ['task', 'event'],
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    components: components,
    mounted() {
        this.event.on("run", this.run);
        this.event.on("stop", this.stop);
        this.event.on("collapseTask", this.collapseTask);
    },
    beforeDestroy() {
        this.removeListeners();
    },
    methods: {
        toggleRun(ev) {
            ev.stopPropagation();
            if (this.running) this.stop();
            else this.run();
        },
        onDeleteClick(ev) {
            ev.stopPropagation();
            this.deleteTask();
        },
        deleteTask() {
            const confirmationAlert = new DeleteConfirmationAlert("You will not be able to recover this task after deletion!");
            confirmationAlert.toggle().then(() => {
                this.stop();
                this.$emit('remove');
            }, () => {});
        },
        saveTask(task) {
            this.stop();
            this.collapseTask();
            this.$emit('edit', task);
        },
        run() {
            AppStatus.runningTasks++;
            this.task.run(this.autoScroll, () => {
                AppStatus.runningTasks--;
            });
        },
        stop() {
            this.task.stop();
        },
        removeListeners() {
            this.event.removeListener("run", this.run);
            this.event.removeListener("stop", this.stop);
        },
        autoScroll() {
            let container = this.$el.querySelector(".run-output");
            if (container && container.scrollTop === container.scrollHeight - container.clientHeight) {
                this.$nextTick(() => {
                    container.scrollTop = container.scrollHeight;
                });
            }
        },
        collapseTask() {
            Materialize.collapseHeader(this.$el);
        }
    },
    computed: {
        editMode() {
            return this.$store.state.editMode;
        },
        statusColor() {
            switch (this.task.status) {
                case TaskStatus.idle:
                case TaskStatus.stopped:
                    return "black";
                case TaskStatus.error:
                    return "red";
                case TaskStatus.running:
                    return "blue";
                case TaskStatus.ok:
                    return "green";
                default:
                    return "grey";
            }
        },
        running() {
            return this.task.isRunning();
        },
        executionTime() {
            if (this.task.beginTime === null) return "-";
            return Utils.generateTimeString(this.task.elapsedTime);
        }
    }
};
</script>

<style lang="scss" scoped>
.run-output {
    overflow-y: auto;
    overflow-x: hidden;
    height: 200px;
    background-color: #eeeeee;
    pre {
        margin: 0 0 0 10px;
        overflow: hidden;
        white-space: pre-wrap;
    }
}

.run-button {
    float: right;
    margin-top: 2px;
    width: 90px;
    cursor: default;
}

.delete-button {
    cursor: default;
    float: right;
    margin-top: 2px;
    width: 110px;
    background-color: red;
    &:hover {
        background-color: #af0000;
    }
}
.task-time {
    text-align: center;
    padding-right: 10px;
    color: #777777;
}
</style>
