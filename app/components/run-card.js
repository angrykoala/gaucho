"use strict";

const yerbamate = require('yerbamate');

const taskStatus = {
    idle: "idle",
    error: "error",
    running: "running",
    ok: "ok"
};


Vue.component('run-card', {
    props: ['task', 'title'],
    data: () => {
        return {
            output: [],
            status: taskStatus.idle
        }
    },
    template: `
    
  <li class="run-card">
    <div class="collapsible-header">
    <span class="badge"><i class="small material-icons">error</i></span>{{title}} 
    </div>
      
    <div class="run-output collapsible-body">
        <a class="waves-effect waves-light btn" v-on:click="runClick(task)">{{title}}</a>
        <p v-for="log in output">
        {{log}}
        </p>
    </div>
  </li>
  `,
    methods: {
        runClick: function(task) {
            this.output = [];
            yerbamate.run(task, ".", {
                    stderr: this.print,
                    stdout: this.print
                },
                (code, out, errs) => {
                    if (!yerbamate.successCode(code)) console.log("Process exited with error code");
                    if (errs.length > 0) console.log("Errors in process:" + errs.length);
                    //console.log("Output: " + out[0]);
                });
        },
        print: function(out) {
            this.output.push(out);

        }
    }
});
