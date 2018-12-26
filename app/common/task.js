"use strict";

const EventEmitter = require('events');
const os = require('os');
const yerbamate = require('yerbamate');

const TaskStatus = require('../common/task_status');
const taskTimer = require('../common/utils').timer;

const TaskEvents = new EventEmitter();
taskTimer(TaskEvents, 1000);
const outputMaxSize = 6000;

class Task {
    constructor(title, path, command) {
        this.title = title.trim() || "";
        this.command = command || "";
        this.path = path || "";
        this.status = TaskStatus.idle;

        this.output = null;
        this.beginTime = null;
        this.finishTime = null;
        this.elapsedTime = null;
        this.onTimeUpdate = null;

        this._scheduleTimeout = null;
    }



    run(stdout, done) {
        this._clearTimeout();
        if (this.isRunning()) {
            throw new Error("Trying to run task without stopping it first");
        }
        this.output = "";
        this.status = TaskStatus.running;
        this.beginTime = Date.now();
        this.finishTime = null;
        let executionPath = this.path;
        if (!executionPath) executionPath = this._generateDefaultPath();
        const onOutput = (out) => {
            this.output += `\n${out}`;
            this.output = this.output.slice(-outputMaxSize).trim();
            stdout(this.output);
        };
        this.proc = yerbamate.run(this._processCommand(), executionPath, {
            stderr: onOutput,
            stdout: onOutput,
            maxOutputSize: 1
        },
        (code) => {
            if (this.status !== TaskStatus.stopped) this.status = yerbamate.successCode(code) ? TaskStatus.ok : TaskStatus.error;

            this.finishTime = Date.now();
            this._updateElapsedTime();
            TaskEvents.removeListener("time-update", this.onTimeUpdate);
            done();
        });
        this.onTimeUpdate = () => {
            this._updateElapsedTime();
        };
        TaskEvents.on("time-update", this.onTimeUpdate);
        this._updateElapsedTime();
    }

    stop(cb) {
        this._clearTimeout();
        if (this.isRunning()) {
            yerbamate.stop(this.proc, cb);
            this.status = TaskStatus.stopped;
        } else{
            this.status = TaskStatus.stopped;
            if(cb) cb();
        }
    }

    isRunning() {
        return this.status === TaskStatus.running;
    }

    isScheduled() {
        return this.status === TaskStatus.scheduled;
    }

    getData() {
        let res = {
            title: this.title,
            command: this.command
        };
        if (this.path !== "") res.path = this.path;
        return res;
    }

    schedule(seconds, stdout, onRun, done) {
        this.stop(() => {
            this.status = TaskStatus.scheduled;
            this._scheduleTimeout = setTimeout(() => {
                onRun();
                this.run(stdout, done);
            }, seconds * 1000);
        });
    }

    _updateElapsedTime() {
        if (this.beginTime === null) throw new Error("Error, cant update time");
        let finishTime = this.finishTime;
        if (finishTime === null) finishTime = Date.now();

        this.elapsedTime = Math.trunc((finishTime - this.beginTime) / 1000);
    }

    _processCommand() {
        return this.command.replace(/(^|\s)sudo($|\s)/g, "$1pkexec$2");
    }

    _generateDefaultPath() {
        return os.homedir();
    }

    _clearTimeout() {
        if(this._scheduleTimeout) {
            clearTimeout(this._scheduleTimeout);
        }
        this._scheduleTimeout = null;
    }
}

Task.TaskStatus = TaskStatus;

module.exports = Task;
