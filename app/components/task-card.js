"use strict";

const taskStatus = require('../tasks').taskStatus;


module.exports= {
    props: ['task'],
    data: () => {
        return {
            output: "",
            //status: this.task.status,
            //statusColor: this.getStatusColor(this.task.status),
            //running: this.task.isRunning()
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
            this.task.run(this.print);
        },
        stop: function(ev) {
            if (ev) ev.stopPropagation();
            this.task.stop();
        },
        print: function(out) {
            this.output += "\n" + out;
            this.output = this.output.slice(-10000);
            /*let outputElement=this.$el.querySelector(".run-output");
            console.log(outputElement.scrollHeight);
            outputElement.scrollTop = outputElement.scrollHeight;
            console.log(outputElement.scrollTop);*/

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
        running: function(){
            return this.task.isRunning();
        }
    }
}
