"use strict";

const taskStatus = require('../task').taskStatus;


module.exports = {
    props: ['task'],
    data: () => {
        return {
            output: "",
            cleanOutput: false
        };
    },
    template: `
    <li class="run-card">
        <div class="collapsible-header row">
         <div class="col s6">
            <strong>{{task.title}}</strong>
            </div>
            <div class="col s5">
            <a class="waves-effect waves-light btn run-button" v-on:click="run" v-show="!running">Run</a>
            <a class="waves-effect waves-light btn run-button" v-on:click="stop" v-show="running">Stop</a>
            </div>
            <div class="col s1">
            <div class="badge"><i class="small material-icons" v-bind:style="{color: statusColor}" v-bind:class="{ disabled: running }">{{task.status}}</i></div>
            </div>
        </div>

    <div class="collapsible-body">
        <div class="run-output">
            <p>
            {{output}}
            </p>
        </div>
    </div>
  </li>
  `,     
    methods: {
        run: function(ev) {
            if (ev) ev.stopPropagation();
            this.task.run(this.print, () => {
                this.cleanOutput = true;
            });
        },
        stop: function(ev) {
            if (ev) ev.stopPropagation();
            this.task.stop();
        },
        print: function(out) {
            if (this.cleanOutput) {
                this.output = "";
                this.cleanOutput = false;
            } else this.output = "\n";
            this.output += out;
            this.output = this.output.slice(-10000);
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
