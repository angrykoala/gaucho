"use strict";

const yerbamate = require('yerbamate');

const taskStatus = {
    idle: "do_not_disturb_off",
    error: "error",
    running: "autorenew",
    ok: "check_circle"
};


Vue.component('run-card', {
    props: ['task', 'title'],
    data: () => {
        return {
            output: [],
            status: taskStatus.idle,
            statusColor: ""
        };
    },
    template: `
    
    <li class="run-card">
        <div class="collapsible-header">
            <span class="badge"><i class="small material-icons" v-bind:style="{color: statusColor}">{{status}}</i></span>{{title}} 
        </div>
      
    <div class="collapsible-body">
        <a class="waves-effect waves-light btn run-buton" v-on:click="runClick(task)">{{title}}</a>
        <div class="run-output">
            <p v-for="log in output">
            {{log}}
            </p>
        </div>
    </div>
  </li>
  `,
    methods: {
        runClick: function(task) {
            this.status=taskStatus.running;
            this.statusColor="";
            this.output = [];
            yerbamate.run(task, ".", {
                    stderr: this.print,
                    stdout: this.print
                },
                (code, out, errs) => {
                    if (!yerbamate.successCode(code)){
                        this.status=taskStatus.error;
                        this.statusColor="red";
                    }else{
                        this.status=taskStatus.ok;
                        this.statusColor="green";
                    }
                    if (errs.length > 0) console.log("Errors in process:" + errs.length);
                    
                    //console.log("Output: " + out[0]);
                });
        },
        print: function(out) {
            this.output.push(out);

        }
    }
});
