"use strict";

const yerbamate = require('yerbamate');
const Utils = require('../common/utils');

const taskStatus = {
    idle: "do_not_disturb_off",
    error: "error",
    running: "autorenew",
    ok: "check_circle",
    stopped: "do_not_disturb_off"
};


class Task {
    constructor(title, path, command) {
        this.title = title || "";
        this.path = path || "";
        this.command = command || "";
        this.status = taskStatus.idle;
        this.process = null;
        this.beginTime = null;
        this.finishTime = null;
    }

    run(stdout, done) {
        this.status = taskStatus.running;
        this.beginTime = Date.now();
        this.finishTime = null;
        this.proc = yerbamate.run(this.command, this.path, {
                stderr: stdout,
                stdout: stdout
            },
            (code) => {
                if (this.status !== taskStatus.stopped) this.status = yerbamate.successCode(code) ? taskStatus.ok : taskStatus.error;
                this.finishTime = Date.now();
                done();
            });
    }

    stop(cb) {
        if (this.isRunning()) {
            yerbamate.stop(this.proc, cb);
        } else cb();
        this.status = taskStatus.stopped;
    }

    isRunning() {
        return this.status === taskStatus.running;
    }

    toJSON() {
        let res = {
            title: this.title,
            command: this.command,
        };
        if (this.path !== ".") res.path = this.path;
        return res;
    }

    printTime() {
        if (this.beginTime === null) return "";
        let finishTime = this.finishTime;
        if (finishTime === null) finishTime = Date.now();

        const time = Math.trunc((finishTime - this.beginTime) / 1000);

        return Utils.generateTimeString(time);
    }
}

Task.taskStatus = taskStatus;

module.exports = Task;
