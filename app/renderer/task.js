"use strict";

const EventEmitter = require('events');

const yerbamate = require('yerbamate');

const TaskStatus = require('../common/task_status');
const TaskTimer = require('../common/timer');


const TaskEvents = new EventEmitter();
TaskTimer(TaskEvents);

class Task {
    constructor(title, path, command) {
        this.title = title || "";
        this.path = path || "";
        this.command = command || "";
        this.status = TaskStatus.idle;

        this.beginTime = null;
        this.finishTime = null;
        this.elapsedTime = null;
        this.onTimeUpdate = null;
    }

    run(stdout, done) {
        if (this.isRunning()) {
            throw new Error("Trying to run task without stopping it first");
        }
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
                this.updateElapsedTime();
                TaskEvents.removeListener("time-update", this.onTimeUpdate);
                done();
            });
        this.onTimeUpdate = () => {
            this.updateElapsedTime();
        };
        TaskEvents.on("time-update", this.onTimeUpdate);
        this.updateElapsedTime();
    }

    stop(cb) {
        if (this.isRunning()) {
            yerbamate.stop(this.proc, cb);
        } else if (cb) cb();
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

    updateElapsedTime() {
        if (this.beginTime === null) throw new Error("Error, cant update time");
        let finishTime = this.finishTime;
        if (finishTime === null) finishTime = Date.now();

        this.elapsedTime = Math.trunc((finishTime - this.beginTime) / 1000);
    }
}

Task.TaskStatus = TaskStatus;

module.exports = Task;
