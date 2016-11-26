"use strict";

const yerbamate = require('yerbamate');

const taskStatus = {
    idle: "do_not_disturb_off",
    error: "error",
    running: "autorenew",
    ok: "check_circle"
};


class Task {
    constructor(title, path, command) {
        this.title = title || "";
        this.path = path || ".";
        if(this.path.trim()==="") this.path=".";
        this.command = command || "";
        this.status = taskStatus.idle;
        this.process = null;
    }

    run(stdout,done) {
        this.status = taskStatus.running;
        this.proc = yerbamate.run(this.command, this.path, {
                stderr: stdout,
                stdout: stdout
            },
            (code) => {
                console.log("CODE:",code);
                this.status = yerbamate.successCode(code) ? taskStatus.ok : taskStatus.error;
                done();
            });
    }

    stop() {
        if (this.isRunning()) {
            yerbamate.stop(this.proc);
        }
    }

    isRunning() {
        return this.status === taskStatus.running;
    }
    
    toJSON(){
        let res={
            title:this.title,
            command: this.command,
        };
        if(this.path!==".") res.path=this.path;
        return res;
    }
}

Task.taskStatus = taskStatus;

module.exports = Task;
