"use strict";

const yerbamate = require('yerbamate');
const Utils = require('../common/utils');
const TaskStatus = require('../common/task_status');


class Task {
    constructor(title, path, command) {
        this.title = title || "";
        this.path = path || "";
        this.command = command || "";
        this.status = TaskStatus.idle;
        this.process = null;
        this.beginTime = null;
        this.finishTime = null;
    }

    run(stdout, done) {
        this.status = TaskStatus.running;
        this.beginTime = Date.now();
        this.finishTime = null;
        this.proc = yerbamate.run(this.command, this.path, {
                stderr: stdout,
                stdout: stdout
            },
            (code) => {
                if (this.status !== TaskStatus.stopped) this.status = yerbamate.successCode(code) ? TaskStatus.ok : TaskStatus.error;
                this.finishTime = Date.now();
                done();
            });
    }

    stop(cb) {
        if (this.isRunning()) {
            yerbamate.stop(this.proc, cb);
        } else cb();
        this.status = TaskStatus.stopped;
    }

    isRunning() {
        return this.status === TaskStatus.running;
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

Task.TaskStatus = TaskStatus;

module.exports = Task;
