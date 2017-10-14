"use strict";

const EventEmitter = require('events');
const os = require('os');

const yerbamate = require('yerbamate');

const TaskStatus = require('../common/task_status');
const TaskTimer = require('../common/utils').timer;


const TaskEvents = new EventEmitter();
TaskTimer(TaskEvents, 1000);

class Task {
    constructor(title, path, command) {
        this.title = title.trim() || "";
        this.command = command || "";
        this.path = path || "";
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
        let executionPath = this.path;
        if (!executionPath) executionPath = this.generateDefaultPath();
        this.proc = yerbamate.run(this.processCommand(), executionPath, {
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
            this.status = TaskStatus.stopped;
        } else if (cb) cb();
    }

    isRunning() {
        return this.status === TaskStatus.running;
    }

    getData() {
        let res = {
            title: this.title,
            command: this.command,
        };
        if (this.path !== "") res.path = this.path;
        return res;
    }

    updateElapsedTime() {
        if (this.beginTime === null) throw new Error("Error, cant update time");
        let finishTime = this.finishTime;
        if (finishTime === null) finishTime = Date.now();

        this.elapsedTime = Math.trunc((finishTime - this.beginTime) / 1000);
    }

    processCommand() {
        return this.command.replace(/(^|\s)sudo($|\s)/g, "$1pkexec$2");
    }

    generateDefaultPath() {
        return os.homedir();
    }
}

Task.TaskStatus = TaskStatus;

module.exports = Task;
