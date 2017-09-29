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
    <li class="run-card">
        <div class="collapsible-header row unselectable-text">
            <div class="col s4">
                <strong class="truncate">{{task.title}} {{task.order}}</strong>
            </div>
            <div class="col s2">
                <div class="truncate task-time">{{executionTime}}</div>
            </div>
            <div class="col s2">
                <i v-if="AppStatus.editMode" class="small material-icons" v-on:click="(ev) => { changeItemOrder(ev, 'desc', task) }">arrow_downward</i>
                <i v-if="AppStatus.editMode" class="small material-icons" v-on:click="(ev) => { changeItemOrder(ev, 'asc', task) }">arrow_upward</i>
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
        changeItemOrder(ev, order, task) {
            ev.stopPropagation();
            // if (order === "asc") {
            //   task.order = task.order + 1;
            // } else {
            //   task.order = task.order - 1;
            // }
            // this.$emit('edit', task);
            this.$emit('reStructureTasks', order, task);
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
