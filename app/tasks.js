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
        this.command = command || "";
        this.status = taskStatus.idle;
        this.process = null;
    }

    run(stdout) {
        this.status = taskStatus.running;
        this.proc = yerbamate.run(this.command, this.path, {
                stderr: stdout,
                stdout: stdout
            },
            (code) => {
                this.status = yerbamate.successCode(code) ? taskStatus.ok : taskStatus.error;
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
}

Task.taskStatus = taskStatus;

module.exports = Task;
