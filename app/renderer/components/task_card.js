"use strict";

const AppStatus = require('../app_status');
const TaskInput = require('./task_input');
const TaskStatus = require('../../common/task_status');
const ProgressSpinner = require('./progress_spinner');

const DeleteConfirmationAlert = require('../app_alerts').DeleteConfirmationAlert;
const Utils = require('../../common/utils');
const Materialize = require('../materialize');
const ContextMenu = require('./context-menu');

const config = AppStatus.config;

module.exports = {
    props: ['task', 'event'],
    data() {
        return {
            output: "",
            AppStatus: AppStatus,
        };
    },
    components: {
        "task-input": TaskInput,
        "progress-spinner": ProgressSpinner,
        "context-menu": ContextMenu
    },
    template: `
    <li class="run-card task-card">
        <context-menu ref="menu" v-bind:menuItems="menuItems"></context-menu>
        <div class="collapsible-header row unselectable-text" v-on:contextmenu.prevent="openContextMenu">
            <div class="col s1" v-if="AppStatus.editMode">
                <i class="tiny material-icons">drag_handle</i>
            </div>
            <div class="col" v-bind:class="{ s4: AppStatus.editMode, s5: !AppStatus.editMode }">
                <strong class="truncate">{{task.title}}</strong>
            </div>
            <div class="col s3">
                <div class="truncate task-time">{{executionTime}}</div>
            </div>
            <div class="col s3">
                <a v-if="AppStatus.editMode" class="waves-effect waves-light btn delete-button" v-on:click="onDeleteClick">Delete</a>
                <a v-else class="waves-effect waves-light btn run-button" v-on:click="toggleRun">{{running? "Stop" : "Run"}}</a>
            </div>
            <div class="col s1">
                <progress-spinner v-if="running && AppStatus.config.animatedSpinner"></progress-spinner>
                <i v-else class="small material-icons" v-bind:style="{color: statusColor}">{{task.status}}</i>
            </div>
        </div>

    <div class="collapsible-body task-card-body">
        <div v-if="!AppStatus.editMode" class="run-output">
            <pre>{{output}}</pre>
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
        openContextMenu(event) {
            if (!AppStatus.editMode) {  // can't use in edit mode because of draggable
                AppStatus.openContextMenu(this.$refs.menu.$el, event);
            }
        },
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
            this.output = "";
            AppStatus.runningTasks++;
            this.task.run(this.print, () => {
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
        print(out) {
            this.output += `\n${out}`;
            this.output = this.output.slice(-config.outputMaxSize).trim();
            this.autoScroll();
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
        menuItems() {
            return [
                { name: this.running ? 'Stop' : 'Run', click: this.toggleRun },
                { name: AppStatus.editMode ? 'Done Editing' : 'Edit', click: function () {AppStatus.toggleEdit();} }
            ];
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
