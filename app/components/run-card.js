"use strict";

const yerbamate = require('yerbamate');

const taskStatus = {
    idle: "do_not_disturb_off",
    error: "error",
    running: "autorenew",
    ok: "check_circle"
};


Vue.component('run-card', {
    props: ['task', 'title', 'path'],
    data: () => {
        return {
            output: "",
            status: taskStatus.idle,
            statusColor: "",
            running: false,
            proc: null
        };
    },
    template: `
    <li class="run-card">
        <div class="collapsible-header row">
         <div class="col s6">
            <strong>{{title}}</strong>
            </div>
            <div class="col s5">
            <a class="waves-effect waves-light btn run-button" v-on:click="run" v-show="!running">Run</a>
            <a class="waves-effect waves-light btn run-button" v-on:click="stop" v-show="running">Stop</a>
            </div>
            <div class="col s1">
            <div class="badge"><i class="small material-icons" v-bind:style="{color: statusColor}" v-bind:class="{ disabled: running }">{{status}}</i></div>
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
            if(ev) ev.stopPropagation();
            this.status = taskStatus.running;
            this.statusColor = "";
            this.running = true;
            this.output = "";
            this.proc = yerbamate.run(this.task, this.path, {
                    stderr: this.print,
                    stdout: this.print
                },
                (code, out, errs) => {
                    this.running = false;
                    if (!yerbamate.successCode(code)) {
                        this.status = taskStatus.error;
                        this.statusColor = "red";

                    } else {
                        this.status = taskStatus.ok;
                        this.statusColor = "green";
                    }
                    if (errs.length > 0) console.log("Errors in process:", errs);
                });
        },
        stop: function(ev) {
            if(ev) ev.stopPropagation();
            yerbamate.stop(this.proc);
        },
        print: function(out) {
            this.output += "\n" + out;
            this.output = this.output.slice(-10000);
            /*let outputElement=this.$el.querySelector(".run-output");
            console.log(outputElement.scrollHeight);
            outputElement.scrollTop = outputElement.scrollHeight;
            console.log(outputElement.scrollTop);*/

        }
    }
});
