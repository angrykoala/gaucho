"use strict";

const AppStatus = require('../app_status');
const config = require('../../config.json');
const taskStatus = require('../task').taskStatus;

const TaskInput=require('./task_input');

module.exports = {
    props: ['task', 'event'],
    data: () => {
        return {
            output: "",
            AppStatus: AppStatus
        };
    },
    template: `
    <li class="run-card">
        <div class="collapsible-header row">
            <div class="col s6">
                <strong class="truncate">{{task.title}}</strong>                
            </div>
            <div class="col s5">
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
            <task-input v-bind:task="task" v-on:save="editTask"></task-input>
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
        editTask(task){
            this.stop();
            this.$emit('edit',task);
        },
        run: function() {
            this.output = "";
            this.task.run(this.print, () => {

            });
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
        }
    },
    computed: {
        statusColor: function() {
            switch (this.task.status) {
                case taskStatus.idle:
                case taskStatus.stopped:
                    return "black";
                case taskStatus.error:
                    return "red";
                case taskStatus.running:
                    return "blue";
                case taskStatus.ok:
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
