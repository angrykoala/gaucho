"use strict";

const AppStatus = require('../app_status');
const TaskInput = require('./task_input');
const TaskStatus = require('../../common/task_status');
const ProgressSpinner = require('./progress_spinner');

const Material = require('../materialize');
const Utils = require('../../common/utils');

const config = AppStatus.config;


module.exports = {
    props: ['task', 'event'],
    data() {
        return {
            output: "",
            AppStatus: AppStatus
        };
    },
    components: {
        "task-input": TaskInput,
        "progress-spinner": ProgressSpinner
    },
    template: `
    <li class="run-card task-card">
        <div class="collapsible-header row unselectable-text">
            <div class="col s4">
                <strong class="truncate">{{task.title}}</strong>
            </div>
            <div class="col s3">
                <div class="truncate task-time">{{executionTime}}</div>
            </div>
            <div class="col s1">
                <i v-if="AppStatus.editMode" class="tiny material-icons" v-on:click="(evt) => changeItemOrder(evt, {oldIndex: task.order - 1, newIndex: task.order - 2})">arrow_upward</i>
                <i v-if="AppStatus.editMode" class="tiny material-icons" v-on:click="(evt) => changeItemOrder(evt, {oldIndex: task.order - 1, newIndex: task.order})">arrow_downward</i>
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
        changeItemOrder(event, object) {
            event.stopPropagation();
            this.$emit('reStructureTasks', object);
        },
        deleteTask() {
            this.stop();
            this.$emit('remove');
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
            this.output += "\n" + out;
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
            const elements = this.$el.getElementsByClassName('collapsible-header');
            if (elements[0]) {
                elements[0].classList.remove("active");
                Material.updateCollapsible();
            }
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
