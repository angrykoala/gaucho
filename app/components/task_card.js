"use strict";

const taskStatus = require('../task').taskStatus;
const AppStatus = require('../app_status');


module.exports = {
    props: ['task', 'event'],
    data: () => {
        return {
            output: "",
            cleanOutput: false,
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
        <div class="run-output">
            <pre>{{output}}</pre>
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
        run: function() {
            this.task.run(this.print, () => {
                this.cleanOutput = true;
            });
        },
        stop: function() {
            this.task.stop();
        },
        print: function(out) {
            if (this.cleanOutput) {
                this.output = "";
                this.cleanOutput = false;
            }
            this.output += out;
            this.output = this.output.slice(-10000).trim();
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
    }
};
