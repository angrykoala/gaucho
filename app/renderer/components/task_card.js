"use strict";

const AppStatus = require('../app_status');
const TaskInput = require('./task_input');
const TaskStatus = require('../../common/task_status');
const ProgressSpinner = require('./progress_spinner');
const ToolTip = require('./tooltip');

const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;
const Utils = require('../../common/utils');
const Materialize = require('../api/materialize');

module.exports = {
    props: ['task', 'event'],
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    components: {
        "task-input": TaskInput,
        "progress-spinner": ProgressSpinner,
        "tooltip": ToolTip
    },
    template: `
    <li class="run-card task-card">
        <div class="collapsible-header row unselectable-text" v-bind:class="{ 'edit-mode': AppStatus.editMode}">
            <div class="col s1" v-if="AppStatus.editMode">
                <i class="tiny material-icons">drag_handle</i>
            </div>
            <div class="col" v-bind:class="{ s4: AppStatus.editMode, s5: !AppStatus.editMode }">
                <strong class="truncate">{{task.title}}</strong>
            </div>
            <div class="col s3">
                <div class="truncate task-time" v-if="AppStatus.config.showTimer">{{executionTime}}</div>
            </div>
            <div class="col s3">
                <a v-if="AppStatus.editMode" class="waves-effect waves-light btn delete-button" v-on:click="onDeleteClick">Delete</a>
                <a v-else class="waves-effect waves-light btn run-button" v-on:click="toggleRun">{{running? "Stop" : "Run"}}</a>
            </div>
            <div class="col s1">
                <progress-spinner v-if="running && AppStatus.config.animatedSpinner"></progress-spinner>
                <i v-else class="small material-icons" v-bind:style="{color: statusColor}">{{task.status}}</i>
                <tooltip v-bind:taskStatus="task.status"></tooltip>
            </div>
        </div>

        <div class="collapsible-body task-card-body">
            <div v-if="!AppStatus.editMode" class="run-output">
                <pre>{{task.output}}</pre>
            </div>
            <div v-else class="container">
                <task-input v-bind:task="task" v-on:save="saveTask"></task-input>
            </div>
        </div>
  </li>
  `,
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
