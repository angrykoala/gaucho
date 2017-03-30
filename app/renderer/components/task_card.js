"use strict";

const AppStatus = require('../app_status');
const TaskInput = require('./task_input');
const TaskStatus = require('../../common/task_status');

const Material = require('../materialize');

const config = AppStatus.config;


module.exports = {
    props: ['task', 'event'],
    data: () => {
        return {
            output: "",
            executionTime: "-",
            executionUpdateTimer: null,
            AppStatus: AppStatus
        };
    },
    template: `
    <li class="run-card">
        <div class="collapsible-header row unselectable">
            <div class="col s5">
                <strong class="truncate">{{task.title}}</strong>     
            </div>
            <div class="col s3">
                <div class="truncate task-time">{{executionTime}}</div>
            </div>
            <div class="col s3">
                <a v-if="AppStatus.editMode" class="waves-effect waves-light btn delete-button" v-on:click="deleteTask">Delete</a>
                <a v-else class="waves-effect waves-light btn run-button" v-on:click="toggleRun">{{running? "Stop" : "Run"}}</a>
            </div>
            <div class="col s1">
                <div class="badge">
                    <i class="small material-icons" v-bind:style="{color: statusColor}" v-bind:class="{ disabled: running }">{{task.status}}</i>
                </div>
            </div>
        </div>

    <div class="collapsible-body">
        <div v-if="!AppStatus.editMode" class="run-output">
            <pre>{{output}}</pre>
        </div>
        <div v-else class="container">
            <task-input v-bind:task="task" v-on:save="saveTask"></task-input>
        </div>
    </div>
  </li>
  `,
    mounted: function() {
        this.event.on("run", () => {
            if (!this.running) this.run();
        });
        this.event.on("stop", () => {
            if (this.running) this.stop();
        });
    },
    methods: {
        toggleRun: function(ev) {
            ev.stopPropagation();
            if (this.running) this.stop();
            else this.run();
        },
        deleteTask(ev) {
            ev.stopPropagation();
            if (this.running) this.stop();
            this.$emit('remove');

        },
        saveTask(task) {
            this.stop();
            this.collapseTask();
            this.$emit('edit', task);
        },
        run: function() {
            this.output = "";
            this.task.run(this.print, () => {
                this.onTaskFinish();
            });
            this.executionTime = this.task.printTime();
            this.executionUpdateTimer = setInterval(() => {
                this.executionTime = this.task.printTime();
            }, 1000);
        },
        stop: function() {
            this.task.stop();
        },
        print: function(out) {
            this.output += "\n" + out;
            this.output = this.output.slice(-config.outputMaxSize).trim();
            this.autoScroll();
        },
        autoScroll() {
            let container = this.$el.querySelector(".run-output");
            if (container.scrollTop === container.scrollHeight - container.clientHeight) {
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
        },
        onTaskFinish() {
            clearInterval(this.executionUpdateTimer);
            this.executionTime = this.task.printTime();
        }
    },
    computed: {
        statusColor: function() {
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
        running: function() {
            return this.task.isRunning();
        }
    },
    components: {
        "task-input": TaskInput
    }
};
