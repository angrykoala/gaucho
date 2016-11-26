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
                    <a class="waves-effect waves-light btn run-button" v-on:click="toggleRun">{{running? "Stop" : "Run"}}</a>
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
    methods: {
        toggleRun: function(ev){
            ev.stopPropagation();
            if(this.running) this.stop();
            else this.run();
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
            console.log(out);
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
